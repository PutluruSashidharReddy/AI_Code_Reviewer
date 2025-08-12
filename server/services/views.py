from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Count, Q
from .models import Code, AnalysisSession
from .serializers import (
    CodeSerializer, CodeCreateSerializer, CodeAnalysisSerializer,
    AnalysisResponseSerializer, UserStatsSerializer
)
from .ast_1 import analyze_code_with_treesitter

class CodeViewSet(viewsets.ModelViewSet):
    serializer_class = CodeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Code.objects.filter(user=self.request.user).order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CodeCreateSerializer
        return CodeSerializer
    
    @action(detail=True, methods=['post'])
    def reanalyze(self, request, pk=None):
        """Re-run analysis on existing code submission"""
        code_submission = self.get_object()
        success = code_submission.analyze_code()
        
        if success:
            serializer = self.get_serializer(code_submission)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'Analysis failed', 'issues': code_submission.issues},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def by_language(self, request):
        """Get submissions grouped by language"""
        language = request.query_params.get('language')
        queryset = self.get_queryset()
        
        if language:
            queryset = queryset.filter(language=language)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def with_issues(self, request):
        """Get only submissions that have issues"""
        queryset = self.get_queryset().filter(issue_count__gt=0)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CodeAnalysisAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Analyze code with optional saving"""
        serializer = CodeAnalysisSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            code = serializer.validated_data['code']
            language = serializer.validated_data['language']
            print_ast = serializer.validated_data.get('print_ast', False)
            save_submission = serializer.validated_data.get('save_submission', True)
            title = serializer.validated_data.get('title', '')
            description = serializer.validated_data.get('description', '')
            
            # Run analysis
            issues, tree = analyze_code_with_treesitter(code, language, print_ast)
            
            code_id = None
            if save_submission:
                # Save to database
                code_submission = Code.objects.create(
                    code=code,
                    language=language,
                    user=request.user,
                    title=title,
                    description=description,
                    issues=issues,
                    issue_count=len(issues),
                    analysis_status='analyzed'
                )
                code_id = code_submission.id
            
            response_data = {
                'success': True,
                'language': language,
                'issues': issues,
                'issue_count': len(issues),
                'analysis_status': 'analyzed'
            }
            
            if code_id:
                response_data['code_id'] = code_id
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e),
                'analysis_status': 'error'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get user's code analysis statistics"""
        user_submissions = Code.objects.filter(user=request.user)
        
        # Calculate stats
        total_submissions = user_submissions.count()
        total_issues = sum(submission.issue_count for submission in user_submissions)
        
        # Group by language
        submissions_by_lang = user_submissions.values('language').annotate(
            count=Count('id'),
            avg_issues=Count('issues')
        )
        
        submissions_by_language = {
            item['language']: {
                'count': item['count'],
                'avg_issues': item['avg_issues']
            }
            for item in submissions_by_lang
        }
        
        # Recent submissions
        recent_submissions = user_submissions[:5]
        
        stats_data = {
            'total_submissions': total_submissions,
            'total_issues_found': total_issues,
            'submissions_by_language': submissions_by_language,
            'recent_submissions': CodeSerializer(recent_submissions, many=True).data
        }
        
        return Response(stats_data)

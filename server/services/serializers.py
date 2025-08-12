from rest_framework import serializers
from .models import Code, AnalysisSession
from django.contrib.auth.models import User

class CodeSerializer(serializers.ModelSerializer):
    issue_count = serializers.ReadOnlyField()
    has_issues = serializers.ReadOnlyField()
    critical_issues = serializers.ReadOnlyField()
    
    class Meta:
        model = Code
        fields = [
            'id', 'title', 'description', 'code', 'language', 
            'analysis_status', 'issues', 'issue_count', 'has_issues',
            'critical_issues', 'created_at', 'updated_at', 'analyzed_at'
        ]
        read_only_fields = ['analysis_status', 'issues', 'issue_count', 'analyzed_at']

class CodeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ['title', 'description', 'code', 'language']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        code_instance = super().create(validated_data)
        # Automatically analyze after creation
        code_instance.analyze_code()
        return code_instance

class CodeAnalysisSerializer(serializers.Serializer):
    code = serializers.CharField()
    language = serializers.ChoiceField(choices=['python', 'java', 'cpp'])
    print_ast = serializers.BooleanField(default=False)
    save_submission = serializers.BooleanField(default=True)
    title = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)

class IssueSerializer(serializers.Serializer):
    type = serializers.CharField()
    message = serializers.CharField()
    line = serializers.IntegerField()

class AnalysisResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    language = serializers.CharField()
    issues = IssueSerializer(many=True)
    issue_count = serializers.IntegerField()
    code_id = serializers.IntegerField(required=False)
    analysis_status = serializers.CharField()

class UserStatsSerializer(serializers.Serializer):
    total_submissions = serializers.IntegerField()
    total_issues_found = serializers.IntegerField()
    submissions_by_language = serializers.DictField()
    recent_submissions = CodeSerializer(many=True)

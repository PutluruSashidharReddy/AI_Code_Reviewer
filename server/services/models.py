from django.db import models
from users.models import User
from django.utils import timezone
import json

class Code(models.Model):
    LANGUAGE_CHOICES = [
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending Analysis'),
        ('analyzed', 'Analyzed'),
        ('error', 'Analysis Error'),
    ]
    
    # Basic fields
    id = models.AutoField(primary_key=True)
    code = models.TextField()  # Changed from CharField to TextField for longer code
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='code_submissions')
    
    # Analysis results
    analysis_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    issues = models.JSONField(default=list, blank=True)  # Store analysis issues
    issue_count = models.IntegerField(default=0)
    
    # Metadata
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    analyzed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Code Submission'
        verbose_name_plural = 'Code Submissions'
    
    def __str__(self):
        return f"{self.user.username} - {self.language} - {self.title or 'Untitled'}"
    
    def analyze_code(self):
        """Analyze the code and update the model"""
        from .ast_1 import analyze_code_with_treesitter
        
        try:
            issues, tree = analyze_code_with_treesitter(self.code, self.language, False)
            self.issues = issues
            self.issue_count = len(issues)
            self.analysis_status = 'analyzed'
            self.analyzed_at = timezone.now()
            self.save()
            return True
        except Exception as e:
            self.analysis_status = 'error'
            self.issues = [{'type': 'Error', 'message': str(e), 'line': 0}]
            self.issue_count = 1
            self.save()
            return False
    
    @property
    def has_issues(self):
        return self.issue_count > 0
    
    @property
    def critical_issues(self):
        """Return only critical issues"""
        critical_types = ['Potential Infinite Loop', 'Missing Recursion Base Case']
        return [issue for issue in self.issues if issue.get('type') in critical_types]


class AnalysisSession(models.Model):
    """Track analysis sessions for better insights"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    codes_analyzed = models.ManyToManyField(Code, related_name='sessions')
    session_start = models.DateTimeField(auto_now_add=True)
    session_end = models.DateTimeField(null=True, blank=True)
    total_issues_found = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.user.username} - Session {self.id}"

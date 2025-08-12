from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'codes', views.CodeViewSet, basename='code')

app_name = 'services'  # Changed from 'code_analysis'

urlpatterns = [
    # ViewSet routes
    path('', include(router.urls)),
    
    # Additional API views
    path('analyze/', views.CodeAnalysisAPIView.as_view(), name='analyze_code'),
    path('stats/', views.UserStatsAPIView.as_view(), name='user_stats'),
]

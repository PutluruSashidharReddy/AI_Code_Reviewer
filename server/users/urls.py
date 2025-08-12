from .views import RegisterView
from django.urls import path
from rest_framework_simplejwt.views import (
    # This is the built-in view for login
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bio=models.TextField(
        max_length=500,
        blank=True
    )
    github_profile=models.URLField(
        max_length=200,
        blank=True
    )
    def __str__(self):
        return self.username
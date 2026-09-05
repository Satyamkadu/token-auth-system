import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Override the default integer ID with a secure UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return self.username
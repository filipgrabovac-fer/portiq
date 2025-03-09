from django.db import models

from portiq_server.models.user import User


class Skill(models.Model):
    SKILL_LEVEL = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'), 
        ('professional', 'Professional')
    ]

    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255, null=True, blank=True)
    level = models.CharField(max_length=20, choices=SKILL_LEVEL)
    link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

from django.db import models

from portiq_server.models.user import User


class WorkExperience(models.Model):
    id_work_experience = models.AutoField(primary_key=True, null=False)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

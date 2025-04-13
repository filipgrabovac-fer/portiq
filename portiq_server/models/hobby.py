from django.db import models

from portiq_server.models.user import User


class Hobby(models.Model):
    id_hobby = models.AutoField(primary_key=True, null=False)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

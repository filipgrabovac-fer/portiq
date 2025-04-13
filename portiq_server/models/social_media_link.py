from django.db import models

from portiq_server.models.user import User


class SocialMediaLink(models.Model):
    id_social_media_link = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=255)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.platform + " " + self.link
from django.db import models
from portiq_server.models.user import User

class GithubData(models.Model):
    id_github_data = models.AutoField(primary_key=True, null=False)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.CharField(max_length=255)
    number_of_repos = models.IntegerField()
    number_of_followers = models.IntegerField()
    number_of_following = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
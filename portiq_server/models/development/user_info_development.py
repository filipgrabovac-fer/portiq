
from django.db import models

from portiq_server.models.user import User
from portiq_server.models.development.code_development import CodeDevelopment

class UserInfoDevelopment(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    code_id = models.ForeignKey(CodeDevelopment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

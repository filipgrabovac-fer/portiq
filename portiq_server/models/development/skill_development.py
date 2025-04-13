from django.db import models

from portiq_server.models.user import User
from portiq_server.models.development.code_development import CodeDevelopment


class SkillDevelopment(models.Model):
    id_skill_development = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_code = models.ForeignKey(CodeDevelopment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
from django.db import models

from portiq_server.models.user import User
from portiq_server.models.skill import Skill


class UserSkill(models.Model):
    id_user_skill = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

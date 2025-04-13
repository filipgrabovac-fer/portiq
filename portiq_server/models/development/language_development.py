from django.db import models

from portiq_server.models.development.code_development import CodeDevelopment
from portiq_server.models.user import User

class LanguageDevelopment(models.Model):
    id_language_development = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_code = models.ForeignKey(CodeDevelopment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
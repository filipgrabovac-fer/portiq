from django.db import models

from portiq_server.models.user import User


class ProfessionalSummary(models.Model):
    id_professional_summary = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.summary
from django.db import models

from portiq_server.models.development.certificate_development import CertificateDevelopment
from portiq_server.models.development.education_development import EducationDevelopment
from portiq_server.models.development.hobby_development import HobbyDevelopment
from portiq_server.models.development.other_development import OtherDevelopment
from portiq_server.models.development.project_development import ProjectDevelopment
from portiq_server.models.development.skill_development import SkillDevelopment
from portiq_server.models.user import User
from portiq_server.models.development.user_info_development import UserInfoDevelopment

class PortfolioTemplate(models.Model):
    STATUS_CHOICES = [
        ('private', 'Private'),
        ('public', 'Public'),
    ]
    
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES)
    user_info_development_id = models.ForeignKey(UserInfoDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    education_development_id = models.ForeignKey(EducationDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    skill_development_id = models.ForeignKey(SkillDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    certificate_development_id = models.ForeignKey(CertificateDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    hobby_development_id = models.ForeignKey(HobbyDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    project_development_id = models.ForeignKey(ProjectDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    other_development_id = models.ForeignKey(OtherDevelopment, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.status

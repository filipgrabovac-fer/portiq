from django.db import models

from portiq_server.models.development.certificate_development import CertificateDevelopment
from portiq_server.models.development.education_development import EducationDevelopment
from portiq_server.models.development.hobby_development import HobbyDevelopment
from portiq_server.models.development.language_development import LanguageDevelopment
from portiq_server.models.development.other_development import OtherDevelopment
from portiq_server.models.development.project_development import ProjectDevelopment
from portiq_server.models.development.reference_development import ReferenceDevelopment
from portiq_server.models.development.skill_development import SkillDevelopment
from portiq_server.models.development.work_experience_development import WorkExperienceDevelopment
from portiq_server.models.user import User
from portiq_server.models.development.user_info_development import UserInfoDevelopment

class PortfolioTemplate(models.Model):
    STATUS_CHOICES = [
        ('private', 'Private'),
        ('public', 'Public'),
    ]
    
    id_portfolio_template = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES)
    id_user_info_development = models.ForeignKey(UserInfoDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_education_development = models.ForeignKey(EducationDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_skill_development = models.ForeignKey(SkillDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_certificate_development = models.ForeignKey(CertificateDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_hobby_development = models.ForeignKey(HobbyDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_project_development = models.ForeignKey(ProjectDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_other_development = models.ForeignKey(OtherDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_language_development = models.ForeignKey(LanguageDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_reference_development = models.ForeignKey(ReferenceDevelopment, on_delete=models.CASCADE, null=True, blank=True)
    id_work_experience_development = models.ForeignKey(WorkExperienceDevelopment, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.status

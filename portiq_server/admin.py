from django.contrib import admin

# Register your models here.
from portiq_server.models.certificate import Certificate
from portiq_server.models.development.certificate_development import CertificateDevelopment
from portiq_server.models.development.code_development import CodeDevelopment
from portiq_server.models.development.css_development import CssDevelopment
from portiq_server.models.development.education_development import EducationDevelopment
from portiq_server.models.development.hobby_development import HobbyDevelopment
from portiq_server.models.development.html_development import HtmlDevelopment
from portiq_server.models.development.javascript_development import JavascriptDevelopment
from portiq_server.models.development.other_development import OtherDevelopment
from portiq_server.models.development.project_development import ProjectDevelopment
from portiq_server.models.development.skill_development import SkillDevelopment
from portiq_server.models.development.user_info_development import UserInfoDevelopment
from portiq_server.models.education import Education
from portiq_server.models.hobby import Hobby
from portiq_server.models.other import Other
from portiq_server.models.portfolio_template import PortfolioTemplate
from portiq_server.models.professional_summary import ProfessionalSummary
from portiq_server.models.project_link import ProjectLink
from portiq_server.models.project import Project
from portiq_server.models.skill import Skill
from portiq_server.models.social_media_link import SocialMediaLink
from portiq_server.models.user import User
from portiq_server.models.user_portfolio_template import UserPortfolioTemplate
from portiq_server.models.user_skill import UserSkill


admin.site.register(User)
admin.site.register(ProfessionalSummary)
admin.site.register(SocialMediaLink)
admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(Hobby)
admin.site.register(Project)
admin.site.register(Other)
admin.site.register(Certificate)
admin.site.register(CodeDevelopment)
admin.site.register(HtmlDevelopment)
admin.site.register(CssDevelopment)
admin.site.register(JavascriptDevelopment)
admin.site.register(CertificateDevelopment)
admin.site.register(EducationDevelopment)
admin.site.register(HobbyDevelopment)
admin.site.register(ProjectDevelopment)
admin.site.register(OtherDevelopment)
admin.site.register(SkillDevelopment)
admin.site.register(UserInfoDevelopment)
admin.site.register(UserPortfolioTemplate)
admin.site.register(PortfolioTemplate)
admin.site.register(UserSkill)
admin.site.register(ProjectLink)
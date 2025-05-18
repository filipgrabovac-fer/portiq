from typing import TypedDict
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema
from rest_framework import serializers
from django.core.cache import cache
from portiq_server.models.certificate import Certificate
from portiq_server.models.development.certificate_development import CertificateDevelopment
from portiq_server.models.development.code_development import CodeDevelopment
from portiq_server.models.development.css_development import CssDevelopment
from portiq_server.models.development.education_development import EducationDevelopment
from portiq_server.models.development.hobby_development import HobbyDevelopment
from portiq_server.models.development.html_development import HtmlDevelopment
from portiq_server.models.development.javascript_development import JavascriptDevelopment
from portiq_server.models.development.language_development import LanguageDevelopment
from portiq_server.models.development.other_development import OtherDevelopment
from portiq_server.models.development.project_development import ProjectDevelopment
from portiq_server.models.development.skill_development import SkillDevelopment
from portiq_server.models.development.user_info_development import UserInfoDevelopment
from portiq_server.models.portfolio_template import PortfolioTemplate
from portiq_server.models.user import User
from portiq_server.serializers import DevelopmentCodeResponseSerializer, GetSelectedComponentsSerializer, PutSelectedComponentsSerializer

class CodeType(TypedDict):
    type: str
    html: str
    css: str
    js: str

class DevelopmentType(TypedDict):
    groupData: list[CodeType]
    createFullTemplate: bool

class DevelopmentSerializer(serializers.Serializer):
    groupData = serializers.JSONField()
    createFullTemplate = serializers.BooleanField()

class DevelopmentResponseSerializer(serializers.Serializer):
    message = serializers.CharField()


MODEL_MAPPING = {
    "personal_info": UserInfoDevelopment,
    "skill": SkillDevelopment,
    "language": LanguageDevelopment,
    "project": ProjectDevelopment,
    "other": OtherDevelopment,
    "certificate": CertificateDevelopment,
    "education": EducationDevelopment,
    "hobby": HobbyDevelopment,
}

class DevelopmentViewSet(viewsets.ViewSet):
    code = CodeDevelopment.objects.all()
    html = HtmlDevelopment.objects.all()
    css = CssDevelopment.objects.all()
    js = JavascriptDevelopment.objects.all()
    user_info = UserInfoDevelopment.objects.all()
    certificate = Certificate.objects.all()
    education = EducationDevelopment.objects.all()
    hobby = HobbyDevelopment.objects.all()
    language = LanguageDevelopment.objects.all()
    other = OtherDevelopment.objects.all()
    project = ProjectDevelopment.objects.all()
    skill = SkillDevelopment.objects.all()

    @extend_schema(
        request=DevelopmentSerializer,
        responses={200: DevelopmentResponseSerializer},
    )
    @action(detail=False, methods=['post'], url_path="save-code")
    def save_code(self, request):
        data = request.data

        if data.get("createFullTemplate") == True:
            return Response({"message": "Selected full template"}, status=status.HTTP_200_OK)
        
        for dev_data in data.get("groupData"):
            if dev_data.get("html") == "" and dev_data.get("css") == "" and dev_data.get("js") == "":
                continue

            html_development = HtmlDevelopment.objects.create(
                content=dev_data.get("html"),
            )

            css_development = CssDevelopment.objects.create(
                content=dev_data.get("css"),
            )

            js_development = JavascriptDevelopment.objects.create(
                content=dev_data.get("js"),
            )

            code = CodeDevelopment.objects.create(
                    id_html=html_development,
                    id_css=css_development,
                    id_javascript=js_development,
                )

            user: User = User.objects.get(id_user=cache.get("user")["id_user"])

            model = MODEL_MAPPING[dev_data.get("type")]
            model.objects.create(
                id_user=user,
                id_code=code,
                title=dev_data.get("title"),
            )

        return Response({"message": "Code saved successfully"}, status=status.HTTP_200_OK)
        
    @extend_schema(
        responses={200: DevelopmentCodeResponseSerializer},
    )
    @action(detail=False, methods=['get'], url_path="get-component-data")
    def get_component_data(self, request):
        personal_info = UserInfoDevelopment.objects.all().values("id_code", "title", "pk")
        skills = SkillDevelopment.objects.all().values("id_code", "title", "pk")
        languages = LanguageDevelopment.objects.all().values("id_code", "title", "pk")
        projects = ProjectDevelopment.objects.all().values("id_code", "title", "pk")
        certificates = CertificateDevelopment.objects.all().values("id_code", "title", "pk")
        education = EducationDevelopment.objects.all().values("id_code", "title", "pk")
        hobbies = HobbyDevelopment.objects.all().values("id_code", "title", "pk")
        other = OtherDevelopment.objects.all().values("id_code", "title", "pk")

        personal_info = get_component_code(personal_info)
        skills = get_component_code(skills)
        languages = get_component_code(languages)
        projects = get_component_code(projects)
        certificates = get_component_code(certificates)
        education = get_component_code(education)
        hobbies = get_component_code(hobbies)
        other = get_component_code(other)

        data = {
            "info": personal_info,
            "skills": skills,
            "languages": languages,
            "projects": projects,
            "certificates": certificates,
            "education": education,
            "hobbies": hobbies,
            "other": other,
        }

        return Response(data, status=status.HTTP_200_OK)
    

    @extend_schema(
        responses={200: GetSelectedComponentsSerializer},
    )
    @action(detail=False, methods=['get'], url_path="get-selected-components")
    def get_selected_components(self, request):
        selected_components = PortfolioTemplate.objects.filter(id_user=cache.get("user")["id_user"]).first()
        serializer = GetSelectedComponentsSerializer(instance=selected_components)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=GetSelectedComponentsSerializer,
    )
    @action(detail=False, methods=['post'], url_path="update-selected-components")
    def update_selected_components(self, request):
        data = request.data
        user_id = cache.get("user")["id_user"]
        user = User.objects.get(id_user=user_id)
        data["id_user"] = user_id

        serializer = PutSelectedComponentsSerializer(data=data)
       
        if serializer.is_valid():
            portfolio_template = PortfolioTemplate.objects.filter(id_user=user_id).first()
            if not portfolio_template:
                portfolio_template = PortfolioTemplate.objects.create(id_user=user)

            portfolio_template.id_user_info_development = UserInfoDevelopment.objects.filter(pk=data.get("id_user_info_development")).first()
            portfolio_template.id_skill_development = SkillDevelopment.objects.filter(pk=data.get("id_skill_development")).first()
            portfolio_template.id_language_development = LanguageDevelopment.objects.filter(pk=data.get("id_language_development")).first()
            portfolio_template.id_project_development = ProjectDevelopment.objects.filter(pk=data.get("id_project_development")).first()
            portfolio_template.id_certificate_development = CertificateDevelopment.objects.filter(pk=data.get("id_certificate_development")).first()
            portfolio_template.id_education_development = EducationDevelopment.objects.filter(pk=data.get("id_education_development")).first()
            portfolio_template.id_hobby_development = HobbyDevelopment.objects.filter(pk=data.get("id_hobby_development")).first()
            portfolio_template.id_other_development = OtherDevelopment.objects.filter(pk=data.get("id_other_development")).first()

            portfolio_template.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_component_code(data):
    new_data = []
    for item in data:
        code = CodeDevelopment.objects.filter(id_code_development=item["id_code"]).first()
        html = HtmlDevelopment.objects.get(id_html_development=code.id_html.id_html_development)
        css = CssDevelopment.objects.get(id_css_development=code.id_css.id_css_development)
        js = JavascriptDevelopment.objects.get(id_javascript_development=code.id_javascript.id_javascript_development)
        code = {
            "html": html.content,
            "css": css.content,
            "js": js.content,
            "title": item["title"],
            "id": item["pk"],
        }
        new_data.append(code)
    return new_data
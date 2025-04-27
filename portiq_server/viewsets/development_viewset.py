from typing import TypedDict
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema
from rest_framework import serializers
from django.core.cache import cache
from portiq_server.models.certificate import Certificate
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
from portiq_server.models.user import User

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
        data: DevelopmentType = request.data

        if data.get("createFullTemplate") == True:
            return JsonResponse({"message": "Selected full template"}, status=status.HTTP_200_OK)
        
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

            if dev_data.get("type") == "personal_info":
                UserInfoDevelopment.objects.create(
                    id_user=user,
                    id_code=code,
                    title=dev_data.get("title"),
                )
            elif dev_data.get("type") == "skill":
                SkillDevelopment.objects.create(
                    id_user=user,
                    id_code=code,
                    title=dev_data.get("title"),
                )
            elif dev_data.get("type") == "language":
                LanguageDevelopment.objects.create(
                    id_user=user,
                    id_code=code,
                    title=dev_data.get("title"),
                )
            elif dev_data.get("type") == "project":
                ProjectDevelopment.objects.create(
                    id_user=user,
                    id_code=code,
                    title=dev_data.get("title"),
                )
            elif dev_data.get("type") == "other":
                OtherDevelopment.objects.create(
                    id_user=user,
                    id_code=code,
                    title=dev_data.get("title"),
                )

        return JsonResponse({"message": "Code saved successfully"}, status=status.HTTP_200_OK)
        
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.cache import cache
from drf_spectacular.utils import extend_schema
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
from portiq_server.models.education import Education
from portiq_server.models.hobby import Hobby
from portiq_server.models.language import Language
from portiq_server.models.other import Other
from portiq_server.models.portfolio_template import PortfolioTemplate
from portiq_server.models.project import Project
from portiq_server.models.skill import Skill

from portiq_server.models.user import User
from portiq_server.serializers import (
    CertificateSerializer,
    EducationSerializer,
    GetComponentCodeSerializer,
    PostCertificateSerializer,
    PostHobbySerializer,
    ProfileComponentDestroySerializer,
    PostProjectSerializer,
    PostSkillSerializer,
    PostLanguageSerializer,
    PostOtherSerializer,
    PostEducationSerializer,
    SkillSerializer,
    LanguageSerializer,
    OtherSerializer,
    HobbySerializer,
    ProjectSerializer
)

MODEL_MAPPING = {
    'certificates': Certificate,
    'education': Education,
    'skills': Skill,
    'projects': Project,
    'languages': Language,
    'other': Other,
    'hobbies': Hobby
}

POST_SERIALIZER_MAPPING = {
    'certificates': PostCertificateSerializer,
    'education': PostEducationSerializer,
    'skills': PostSkillSerializer,
    'projects': PostProjectSerializer,
    'languages': PostLanguageSerializer,
    'other': PostOtherSerializer,
    'hobbies': PostHobbySerializer
}

SERIALIZER_MAPPING = {
    'certificates': CertificateSerializer,
    'education': EducationSerializer,
    'skills': SkillSerializer,
    'projects': ProjectSerializer,
    'languages': LanguageSerializer,
    'other': OtherSerializer,
    'hobbies': HobbySerializer
}

COMPONENT_MODEL_MAPPING = {
    "certificates": CertificateDevelopment,
    "education": EducationDevelopment,
    "skills": SkillDevelopment,
    "projects": ProjectDevelopment,
    "languages": LanguageDevelopment,
    "other": OtherDevelopment,
    "hobbies": HobbyDevelopment,
    "info": UserInfoDevelopment
}

COMPONENT_TYPE_BY_ID = {
    "id_certificate_development": "certificates",
    "id_education_development": "education",
    "id_skill_development": "skills",
    "id_project_development": "projects",
    "id_language_development": "languages",
    "id_other_development": "other",
    "id_hobby_development": "hobbies",
    "id_user_info_development": "info"
}

class ProfileComponentViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path="profile-component-delete")
    def component_delete(self, request):
        serializer = ProfileComponentDestroySerializer(data=request.data)

        if serializer.is_valid():
            model = MODEL_MAPPING[serializer.validated_data["type"]]
            model.objects.filter(pk=serializer.validated_data["id"]).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path="profile-component")
    def component_create(self, request):
        data = request.data
        component_type = data["type"]
        item = data["item"]
        user = cache.get("user")
        
        serializer = POST_SERIALIZER_MAPPING[component_type](data=item)
        if serializer.is_valid():
            model = MODEL_MAPPING[component_type]
            item = serializer.validated_data
            item["id_user"] = User.objects.get(id_user=user["id_user"])
            model.objects.create(**serializer.validated_data)
            return Response({"message": "Component created successfully"}, status=status.HTTP_201_CREATED)
        return Response(
            {"error": f"Failed to create component: {serializer.errors}"},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['post'], url_path="profile-component-update")
    def component_update(self, request):
        data = request.data
        component_type = data["type"]
        item = data["item"]
        user = cache.get("user")
        item["id_user"] = user["id_user"]
        instance = MODEL_MAPPING[component_type].objects.get(pk=item["id"])

        serializer = SERIALIZER_MAPPING[component_type](data=item, instance=instance, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Component created successfully"}, status=status.HTTP_201_CREATED)
        return Response(
            {"error": f"Failed to create component: {serializer.errors}"},
            status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        responses={200: GetComponentCodeSerializer}
    )
    @action(detail=False, methods=['get'], url_path="profile-component-get-code")
    def get_component_code(self, request):
        portfolio_template_code = {}
        user = cache.get("user")

        portfolio_template = PortfolioTemplate.objects.filter(id_user=user["id_user"]).values(
            "id_user_info_development",
            "id_education_development",
            "id_skill_development",
            "id_certificate_development",
            "id_hobby_development",
            "id_project_development",
            "id_other_development",
        ).first()

        for portfolio_component_key, portfolio_component_value in portfolio_template.items():
            if not portfolio_component_value:
                continue
            code = retrieve_component_code(portfolio_component_key, portfolio_component_value)
            portfolio_template_code.update({COMPONENT_TYPE_BY_ID[portfolio_component_key]: code})

        return Response(portfolio_template_code, status=status.HTTP_200_OK)


def retrieve_component_code(component_name:str, id_component: int):
    component_type = COMPONENT_TYPE_BY_ID[component_name]
    model = COMPONENT_MODEL_MAPPING[component_type]
    component = model.objects.filter(pk=id_component).values("id_code").first()

    code = CodeDevelopment.objects.filter(pk=component["id_code"]).values("id_html", "id_css", "id_javascript").first()

    html = HtmlDevelopment.objects.get(pk=code["id_html"]).content
    css = CssDevelopment.objects.get(pk=code["id_css"]).content
    js = JavascriptDevelopment.objects.get(pk=code["id_javascript"]).content

    return {
        "html": html,
        "css": css,
        "js": js
    }

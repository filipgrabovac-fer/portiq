from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.cache import cache

from portiq_server.models.certificate import Certificate
from portiq_server.models.education import Education
from portiq_server.models.hobby import Hobby
from portiq_server.models.language import Language
from portiq_server.models.other import Other
from portiq_server.models.project import Project
from portiq_server.models.skill import Skill

from portiq_server.models.user import User
from portiq_server.serializers import (
    CertificateSerializer,
    EducationSerializer,
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
    'language': Language,
    'other': Other,
    'hobbies': Hobby
}

POST_SERIALIZER_MAPPING = {
    'certificates': PostCertificateSerializer,
    'education': PostEducationSerializer,
    'skills': PostSkillSerializer,
    'projects': PostProjectSerializer,
    'language': PostLanguageSerializer,
    'other': PostOtherSerializer,
    'hobbies': PostHobbySerializer
}

SERIALIZER_MAPPING = {
    'certificates': CertificateSerializer,
    'education': EducationSerializer,
    'skills': SkillSerializer,
    'projects': ProjectSerializer,
    'language': LanguageSerializer,
    'other': OtherSerializer,
    'hobbies': HobbySerializer
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
            item["id_user"] = User.objects.get(id_user=user.id_user)
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
        item["id_user"] = User.objects.get(id_user=user.id_user)
        
        serializer = SERIALIZER_MAPPING[component_type](data=item)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Component created successfully"}, status=status.HTTP_201_CREATED)
        return Response(
            {"error": f"Failed to create component: {serializer.errors}"},
            status=status.HTTP_400_BAD_REQUEST)

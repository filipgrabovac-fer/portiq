from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


from portiq_server.models.certificate import Certificate
from portiq_server.models.education import Education
from portiq_server.models.language import Language
from portiq_server.models.other import Other
from portiq_server.models.project import Project
from portiq_server.models.skill import Skill

from portiq_server.serializers import CertificateSerializer, EducationSerializer, ProfileComponentDestroySerializer

MODEL_MAPPING = {
    'certificates': Certificate,
    'education': Education,
    'skills': Skill,
    'projects': Project,
    'language': Language,
    'other': Other
}

SERIALIZER_MAPPING = {
    'certificates': CertificateSerializer,
    'education': EducationSerializer,
    # 'skills': SkillSerializer,
    # 'projects': ProjectSerializer,
    # 'language': LanguageSerializer,
    # 'other': OtherSerializer
}
class ProfileComponentViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['delete'], url_path="profile-component")
    def component_delete(self, request):
        serializer = ProfileComponentDestroySerializer(data=request.data)
        if serializer.is_valid():
            model = MODEL_MAPPING[serializer.validated_data["type"]]
            model.objects.filter(pk=serializer.validated_data["id"]).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['put'], url_path="profile-component")
    def component_update(self, request):
        data = request.data
        component_id = data["id"]
        model_type = data["type"]
        model = MODEL_MAPPING[model_type]
        serializer = SERIALIZER_MAPPING[model_type](data=data)

        model.objects.filter(id=component_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

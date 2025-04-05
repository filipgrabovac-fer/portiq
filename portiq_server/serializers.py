from rest_framework import serializers

from portiq_server.models.education import Education
from portiq_server.models.project import Project
from portiq_server.models.skill import Skill
from .models.user import User
from .models.certificate import Certificate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id", "first_name", "last_name", "email", "phone_number", "image_url", "address", "city", "state", "zip_code", "country", "created_at"]

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [ "id", "title", "description", "start_date", "end_date", "location", "link", "created_at"]

class UserDetailsSerializer(serializers.Serializer):
    info = serializers.DictField(child=serializers.CharField(allow_null=True))
    certificates = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    education = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    skills = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    projects = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))

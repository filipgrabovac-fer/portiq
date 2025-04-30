from rest_framework import serializers
from portiq_server.models.education import Education
from .models.user import User
from .models.certificate import Certificate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id_user", "first_name", "last_name", "email", "phone_number", "image_url", "address", "city", "state", "zip_code", "country", "created_at"]

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [ "id_certificate", "title", "description", "start_date", "end_date", "location", "link", "created_at"]

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [ "id_education", "title", "description", "location", "type", "start_date", "end_date", "link", "created_at"]

class PutUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip_code", "country"]

class ProfileComponentDestroySerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    type = serializers.ChoiceField(
        choices=['certificates', 'education', 'skills', 'projects', 'language', 'other'],
        required=True
    )

class ProfileComponentUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    type = serializers.ChoiceField(
        choices=['certificate', 'education', 'skill', 'project', 'language', 'other'],
        required=True
    )
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)
    level = serializers.CharField(required=False, allow_blank=True)  # za skills
    type_field = serializers.CharField(required=False, allow_blank=True)  # za education

class UserDetailsSerializer(serializers.Serializer):
    info = serializers.DictField(child=serializers.CharField(allow_null=True))
    certificates = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    education = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    skills = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    projects = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    languages = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    other = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    hobbies = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    

from rest_framework import serializers
from portiq_server.models.education import Education
from portiq_server.models.hobby import Hobby
from portiq_server.models.language import Language
from portiq_server.models.other import Other
from portiq_server.models.project import Project
from portiq_server.models.skill import Skill
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
        choices=['certificates', 'education', 'skills', 'projects', 'language', 'other', 'hobbies'],
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
    level = serializers.CharField(required=False, allow_blank=True) 
    type_field = serializers.CharField(required=False, allow_blank=True) 

class UserDetailsSerializer(serializers.Serializer):
    info = serializers.DictField(child=serializers.CharField(allow_null=True))
    certificates = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    education = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    skills = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    projects = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    languages = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    other = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    hobbies = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    
class PostProjectSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)

class PostSkillSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    level = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)

class PostLanguageSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    level = serializers.CharField(required=False)

class PostOtherSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    link = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)


class PostHobbySerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)


class PostEducationSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)
    type = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)

class PostCertificateSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)
class SkillSerializer(serializers.ModelSerializer):
    id_skill = serializers.IntegerField(source='id')
    class Meta:
        model = Skill
        fields = [ "id_skill", "title", "description", "location", "level", "link"]
class LanguageSerializer(serializers.ModelSerializer):
    id_language = serializers.IntegerField(source='id')

    class Meta:
        model = Language
        fields = [ "id_language", "title", "level"]
class OtherSerializer(serializers.ModelSerializer):
    id_other = serializers.IntegerField(source='id')

    class Meta:
        model = Other
        fields = [ "id_other", "title", "description", "start_date", "end_date", "location", "link"]
class HobbySerializer(serializers.ModelSerializer):
    id_hobby = serializers.IntegerField(source='id')

    class Meta:
        model = Hobby
        fields = [ "id_hobby", "title", "description"]
class ProjectSerializer(serializers.ModelSerializer):
    id_project = serializers.IntegerField(source='id')

    class Meta:
        model = Project
        fields = [ "id_project", "title", "description", "start_date", "end_date", "location"]

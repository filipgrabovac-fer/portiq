from rest_framework import serializers
from portiq_server.models.education import Education
from portiq_server.models.hobby import Hobby
from portiq_server.models.language import Language
from portiq_server.models.other import Other
from portiq_server.models.portfolio_template import PortfolioTemplate
from portiq_server.models.project import Project
from portiq_server.models.reference import Reference
from portiq_server.models.skill import Skill
from portiq_server.models.work_experience import WorkExperience
from .models.user import User
from .models.certificate import Certificate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id_user", "first_name", "last_name", "email", "phone_number", "image_url", "address", "city", "state", "zip_code", "country", "created_at"]

class CertificateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_certificate')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Certificate
        fields = ["id", "title", "description", "start_date", "end_date", "location", "link", "created_at"]

class EducationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_education')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Education
        fields = ["id", "title", "description", "location", "type", "start_date", "end_date", "link", "created_at"]

class PutUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip_code", "country"]

class ProfileComponentDestroySerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    type = serializers.ChoiceField(
        choices=['certificates', 'education', 'skills', 'projects', 'languages', 'other', 'hobbies'],
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
    work_experiences = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    references = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    
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

class PostWorkExperienceSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)

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
    id = serializers.IntegerField(source='id_skill')
    class Meta:
        model = Skill
        fields = ["id", "title", "description", "location", "level", "link", "id_user"]

class LanguageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_language')
    class Meta:
        model = Language
        fields = ["id", "title", "level", "id_user"]

class OtherSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_other')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Other
        fields = ["id", "title", "description", "start_date", "end_date", "location", "link", "id_user"]

class HobbySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_hobby')
    class Meta:
        model = Hobby
        fields = ["id", "title", "description", "id_user"]

class WorkExperienceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_work_experience')
    class Meta:
        model = WorkExperience
        fields = ["id", "title", "description", "start_date", "end_date", "location", "id_user"]

class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_project')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Project
        fields = ["id", "title", "description", "start_date", "end_date", "location", "id_user"]

class DevelopmentCodeSerializer(serializers.Serializer):
    title = serializers.CharField(required=True)
    id_code = serializers.IntegerField(required=True)

class CodeSerializer(serializers.Serializer):
    html = serializers.CharField(required=True)
    css = serializers.CharField(required=True)
    js = serializers.CharField(required=True)
    title = serializers.CharField(required=True)
    id = serializers.IntegerField(required=True)
class DevelopmentCodeResponseSerializer(serializers.Serializer):
    info = CodeSerializer(many=True)
    skills = CodeSerializer(many=True)
    languages = CodeSerializer(many=True)
    projects = CodeSerializer(many=True)
    certificates = CodeSerializer(many=True)
    education = CodeSerializer(many=True)
    hobbies = CodeSerializer(many=True)
    other = CodeSerializer(many=True)
    references = CodeSerializer(many=True)
    work_experiences = CodeSerializer(many=True)

class GetSelectedComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model=PortfolioTemplate
        fields = ["id_user_info_development","id_skill_development","id_language_development","id_project_development","id_certificate_development","id_education_development" ,"id_hobby_development","id_other_development", "id_reference_development", "id_work_experience_development"]

class PutSelectedComponentsSerializer(serializers.ModelSerializer):
    id_user_info_development = serializers.IntegerField(required=False, allow_null=True)
    id_skill_development = serializers.IntegerField(required=False, allow_null=True)
    id_language_development = serializers.IntegerField(required=False, allow_null=True)
    id_project_development = serializers.IntegerField(required=False, allow_null=True)
    id_certificate_development = serializers.IntegerField(required=False, allow_null=True)
    id_education_development = serializers.IntegerField(required=False, allow_null=True)
    id_hobby_development = serializers.IntegerField(required=False, allow_null=True)
    id_other_development = serializers.IntegerField(required=False, allow_null=True)
    id_reference_development = serializers.IntegerField(required=False, allow_null=True)
    id_work_experience_development = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model=PortfolioTemplate
        fields = ["id_user", "id_portfolio_template","id_user_info_development","id_skill_development","id_language_development","id_project_development","id_certificate_development","id_education_development" ,"id_hobby_development","id_other_development", "id_reference_development", "id_work_experience_development"]


class CodeType(serializers.Serializer):
    html = serializers.CharField(required=True)
    css = serializers.CharField(required=True)
    js = serializers.CharField(required=True)

class GetComponentCodeSerializer(serializers.Serializer):
    info = CodeType(required=True)
    skills = CodeType(required=True)
    languages = CodeType(required=True)
    projects = CodeType(required=True)
    certificates = CodeType(required=True)
    education = CodeType(required=True)
    hobbies = CodeType(required=True)
    other = CodeType(required=True)
    references = CodeType(required=True)
    work_experiences = CodeType(required=True)
    
class UserLoggedInSerializer(serializers.Serializer):
    id_user = serializers.IntegerField(required=True)

class ReferenceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_reference')
    class Meta:
        model = Reference
        fields = ["id", "title", "description", "link", "id_user"]

class PostReferenceSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)

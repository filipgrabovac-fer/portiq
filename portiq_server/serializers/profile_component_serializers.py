from rest_framework import serializers
from portiq_server.models.portfolio_template import PortfolioTemplate


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




class GetSelectedComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model=PortfolioTemplate
        fields = ["id_user_info_development","id_skill_development","id_language_development","id_project_development","id_certificate_development","id_education_development" ,"id_hobby_development","id_other_development", "id_reference_development", "id_work_experience_development", "id_github_data_development"]

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
    id_github_data_development = serializers.IntegerField(required=False, allow_null=True)
    class Meta:
        model=PortfolioTemplate
        fields = ["id_user", "id_portfolio_template","id_user_info_development","id_skill_development","id_language_development","id_project_development","id_certificate_development","id_education_development" ,"id_hobby_development","id_other_development", "id_reference_development", "id_work_experience_development", "id_github_data_development"]

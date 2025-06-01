from rest_framework import serializers
from portiq_server.models.user import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id_user", "first_name", "last_name", "email", "phone_number", "image_url", "address", "city", "state", "zip_code", "country", "created_at", "github_username"]


# class PutUserDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = [ "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip_code", "country", "github_username"]

class PutUserDataSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    phone_number = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    zip_code = serializers.CharField(required=False)
    country = serializers.CharField(required=False)
    github_username = serializers.CharField(required=False)
    image_url = serializers.CharField(required=False)
    summary = serializers.CharField(required=False)


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
    github_data = serializers.ListField(child=serializers.ListField(child=serializers.CharField(allow_null=True)))
    summary = serializers.CharField(allow_null=True)


class UserLoggedInSerializer(serializers.Serializer):
    id_user = serializers.IntegerField(required=True)
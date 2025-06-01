
from rest_framework import serializers

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
    github_data = CodeSerializer(many=True)



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
    github_data = CodeType(required=True)
from rest_framework import serializers
from portiq_server.models.project import Project


class PostProjectSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)


class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_project')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Project
        fields = ["id", "title", "description", "start_date", "end_date", "location", "id_user"]
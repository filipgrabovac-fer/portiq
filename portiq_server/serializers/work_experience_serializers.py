from rest_framework import serializers
from portiq_server.models.work_experience import WorkExperience


class PostWorkExperienceSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)

class WorkExperienceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_work_experience')
    class Meta:
        model = WorkExperience
        fields = ["id", "title", "description", "start_date", "end_date", "location", "id_user"]
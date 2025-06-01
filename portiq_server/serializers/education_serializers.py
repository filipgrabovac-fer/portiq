from rest_framework import serializers
from portiq_server.models.education import Education


class EducationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_education')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Education
        fields = ["id", "title", "description", "location", "type", "start_date", "end_date", "link", "created_at"]

class PostEducationSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)
    type = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
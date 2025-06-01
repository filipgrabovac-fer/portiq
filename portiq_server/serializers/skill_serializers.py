from rest_framework import serializers
from portiq_server.models.skill import Skill


class PostSkillSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    level = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)

class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_skill')
    class Meta:
        model = Skill
        fields = ["id", "title", "description", "location", "level", "link", "id_user"]

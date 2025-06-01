from rest_framework import serializers
from portiq_server.models.hobby import Hobby


class PostHobbySerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)

class HobbySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_hobby')
    class Meta:
        model = Hobby
        fields = ["id", "title", "description", "id_user"]
from rest_framework import serializers
from portiq_server.models.language import Language


class PostLanguageSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    level = serializers.CharField(required=False)


class LanguageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_language')
    class Meta:
        model = Language
        fields = ["id", "title", "level", "id_user"]
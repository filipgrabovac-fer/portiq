from rest_framework import serializers
from portiq_server.models.other import Other


class PostOtherSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    link = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)


class OtherSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_other')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Other
        fields = ["id", "title", "description", "start_date", "end_date", "location", "link", "id_user"]
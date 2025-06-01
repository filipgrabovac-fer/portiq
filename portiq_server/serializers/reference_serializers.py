from rest_framework import serializers
from portiq_server.models.reference import Reference


class ReferenceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_reference')
    class Meta:
        model = Reference
        fields = ["id", "title", "description", "link", "id_user"]


class PostReferenceSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)

    

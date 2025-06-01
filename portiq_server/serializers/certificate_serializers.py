from rest_framework import serializers
from portiq_server.models.certificate import Certificate


class CertificateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_certificate')
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    class Meta:
        model = Certificate
        fields = ["id", "title", "description", "start_date", "end_date", "location", "link", "created_at"]


class PostCertificateSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    location = serializers.CharField(required=False, allow_blank=True)
    link = serializers.CharField(required=False, allow_blank=True)
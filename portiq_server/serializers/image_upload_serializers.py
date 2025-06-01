from rest_framework import serializers

class PutImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)

class ImageUploadResponseSerializer(serializers.Serializer):
    public_id = serializers.CharField(required=True)
    url = serializers.CharField(required=True)
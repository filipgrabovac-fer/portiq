from rest_framework import serializers

class PostVertexAiGenerateTextSerializer(serializers.Serializer):
    prompt = serializers.CharField(required=True)

class ResponseVertexAiGenerateTextSerializer(serializers.Serializer):
    generated_text = serializers.CharField(required=True)
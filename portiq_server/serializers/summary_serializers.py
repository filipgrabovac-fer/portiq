from rest_framework import serializers

class PutSummarySerializer(serializers.Serializer):
    summary = serializers.CharField(required=True)
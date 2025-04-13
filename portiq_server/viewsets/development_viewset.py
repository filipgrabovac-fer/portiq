from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema
from rest_framework import serializers


class DevelopmentSerializer(serializers.Serializer):
    groupData = serializers.JSONField()
    createFullTemplate = serializers.BooleanField()

class DevelopmentResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

class DevelopmentViewSet(viewsets.ViewSet):
    @extend_schema(
        request=DevelopmentSerializer,
        responses={200: DevelopmentResponseSerializer},
    )
    @action(detail=False, methods=['post'], url_path="save-code")
    def save_code(self, request):
        print(request.data)
        if request.data["createFullTemplate"] == True:
            return JsonResponse({"message": "Selected full template"}, status=status.HTTP_200_OK)
        return JsonResponse({"message": "Code saved successfully"}, status=status.HTTP_200_OK)
        
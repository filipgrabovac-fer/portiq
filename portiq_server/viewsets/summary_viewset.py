from rest_framework import viewsets
from portiq_server.config.vertex_ai_config import generate_text
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema
from django.core.cache import cache
from rest_framework import status
from portiq_server.models.user import User
from portiq_server.serializers.summary_serializers import PutSummarySerializer

class SummaryViewSet(viewsets.ViewSet):
    @extend_schema(
        request=PutSummarySerializer,
    )
    @action(detail=False, methods=['put'], url_path="generate-text")
    def update_summary(self, request):
        summary = request.data.get("summary")
        userId = cache.get("user")["id_user"]
        user = User.objects.get(id_user=userId)
        user.summary = summary
        user.save()

        return Response(status=status.HTTP_200_OK)
   
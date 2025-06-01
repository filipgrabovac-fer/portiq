import cloudinary.uploader
from rest_framework.decorators import action
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, OpenApiRequest
from portiq_server.models.user import User
from django.core.cache import cache
import cloudinary
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from portiq_server.config.cloudinary_config import cloudinary
from portiq_server.serializers.image_upload_serializers import ImageUploadResponseSerializer

class ImageUploadViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    @extend_schema(
        responses={
            200: ImageUploadResponseSerializer,
        }
    )
    @action(detail=False, methods=['post'], url_path="upload-image")
    def upload_image(self, request):
        image = request.data.get("image")
        user = User.objects.filter(id_user=cache.get("user")["id_user"]).first()
        uploaded_image = cloudinary.uploader.upload(file=image, public_id=f"portiq/users/{user.id_user}")

        return Response(data={"url":uploaded_image.get("url")})
    

import requests
from rest_framework.decorators import action
from rest_framework import viewsets
from django.shortcuts import redirect
from portiq.settings import env
from django.core.cache import cache
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework import status
from portiq_server.models.user import User
from portiq_server.serializers import GetLinkedinDataSerializer, PutLinkedinDataSerializer

class LinkedinViewSet(viewsets.ViewSet):
    # @action(detail=False, methods=['get'], url_path="oauth/redirect")
    def linkedin_oauth_redirect(self, request):
        code = request.query_params.get("code")

        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": env("LINKEDIN_REDIRECT_URI"),
            "client_id": env("LINKEDIN_CLIENT_ID"),
            "client_secret": env("LINKEDIN_CLIENT_SECRET"),
        }

        access_token = requests.post("https://www.linkedin.com/oauth/v2/accessToken", data=data).json().get("access_token")

        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        user_data = requests.get("https://api.linkedin.com/v2/userinfo", headers=headers).json()
        cache.set("linkedin_user_data", user_data)

        return redirect("/linkedin")
    
class LinkeinViewSetDetails(viewsets.ViewSet):
    @extend_schema(
        responses={
            200: GetLinkedinDataSerializer,
        }
    )
    @action(detail=False, methods=['get'], url_path="details")
    def linkedin_details(self, request):
        user_data = cache.get("linkedin_user_data")
        cache.delete("linkedin_user_data")
        return Response(user_data)
    
    @extend_schema(
        request=PutLinkedinDataSerializer,
    )
    @action(detail=False, methods=['put'], url_path="update-details")
    def update_linkedin_data(self, request):
        data = request.data
        userId = cache.get("user")["id_user"]

        user = User.objects.get(id_user=userId)
        user.first_name = user.first_name if not data.get("firstName") else data.get("firstName")
        user.last_name = user.last_name if not data.get("lastName") else data.get("lastName")
        user.email = user.email if not data.get("email") else data.get("email")
        user.phone_number = user.phone_number if not data.get("phoneNumber") else data.get("phoneNumber")
        user.image_url = user.image_url if not data.get("imageUrl") else data.get("imageUrl")
        user.save()

        return Response(status=status.HTTP_200_OK)

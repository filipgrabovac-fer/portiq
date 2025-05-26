import requests
from rest_framework.decorators import action
from rest_framework import viewsets
from django.shortcuts import redirect
from portiq.settings import env
from django.core.cache import cache
from rest_framework.response import Response

class LinkedinViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'], url_path="oauth/redirect")
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
    @action(detail=False, methods=['get'], url_path="details")
    def linkedin_details(self, request):
        user_data = cache.get("linkedin_user_data")
        return Response(user_data)

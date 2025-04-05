from django.http import JsonResponse
import requests
from django.views.decorators.csrf import csrf_exempt
from portiq.settings import env
from django.core.cache import cache
from django.shortcuts import redirect
import jwt
from portiq_server.serializers import UserSerializer
from portiq_server.models.user import User
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view

@csrf_exempt
def login_with_google(request):

    code = request.GET.get("code")

    token_url = "https://oauth2.googleapis.com/token"
    token_payload = {
        "code": code,
        "client_id": env("GOOGLE_CLIENT_ID"),
        "client_secret": env("GOOGLE_CLIENT_SECRET"),
        "redirect_uri": env("GOOGLE_REDIRECT_URI"),
        "grant_type": "authorization_code"
    }
    
    credentials = requests.post(token_url, data=token_payload).json()

    user_details = jwt.decode(credentials["id_token"], algorithms=["HS256"],  options={"verify_signature": False})

    existing_user = User.objects.filter(email=user_details["email"]).values().first()

    if existing_user:
        user = existing_user
    else:
        user = User.objects.create(
            email=user_details["email"],
            first_name = user_details["given_name"],
            last_name = user_details["family_name"],
            image_url = user_details["picture"],
        ).save()

    cache.set("user", user, timeout=24*60*60)
    return redirect("/home")

@extend_schema(tags=['logout'])
@api_view(['POST']) 
def logout_user(request):
    cache.delete("user")
    return JsonResponse({"message": "User logged out successfully"})

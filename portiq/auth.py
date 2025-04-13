from django.http import JsonResponse
import requests
from django.views.decorators.csrf import csrf_exempt
from portiq.settings import env
from django.core.cache import cache
from django.shortcuts import redirect
import jwt
from portiq_server.models.qr_code import QRCode
from portiq_server.models.user import User
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view

from portiq_server.utils.qr_code_generator import generate_qr_code

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
        user:User = User.objects.create(
            email=user_details["email"],
            first_name = user_details["given_name"],
            last_name = user_details["family_name"] if "family_name" in user_details else "",
            image_url = user_details["picture"],
        )

    qr_code = generate_qr_code(f'http://localhost:8000/user/{user["id_user"]}')

    find_user = User.objects.filter(id_user=user["id_user"]).first()
    QRCode.objects.create(
        id_user=find_user,
        qr_code=qr_code
    ).save()

    cache.set("user", user, timeout=24*60*60)
    return redirect("/home")

@extend_schema(tags=['logout'])
@api_view(['POST']) 
def logout_user(request):
    cache.delete("user")
    return JsonResponse({"message": "User logged out successfully"})

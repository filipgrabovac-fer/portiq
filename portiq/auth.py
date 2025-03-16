from django.http import JsonResponse
import requests
from django.views.decorators.csrf import csrf_exempt
from portiq.settings import env
from django.core.cache import cache
from django.shortcuts import redirect
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
    
    # Get tokens from Google
    credentials = requests.post(token_url, data=token_payload)
    credentials = credentials.json()
    
    cache.set("demo", "demo_cache", timeout=24*60*60)
    print(credentials)
    return redirect("/home")

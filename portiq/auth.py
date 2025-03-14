from django.http import JsonResponse
import requests

from django.views.decorators.csrf import csrf_exempt

def login_with_google(request):

    token_data = {"code": request.GET.get("code")}
    credentials = requests.post(url="http://localhost:8000/dj-rest-auth/google?code=" + token_data["code"])
    if credentials.status_code == 200:
        return JsonResponse( {"asd": credentials.json()})
    print(credentials)
    return JsonResponse( {"asd": credentials.status_code})
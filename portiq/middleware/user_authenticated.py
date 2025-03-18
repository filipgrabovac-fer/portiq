from django.core.cache import cache
from django.shortcuts import redirect

class UserAuthenticatedMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        path = request.path

        if "api/" in path:
            user = cache.get("user")
            if user is None:
                return redirect("/login")
        
        response = self.get_response(request)
        return response
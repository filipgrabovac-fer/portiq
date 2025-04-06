from django.core.cache import cache
from django.shortcuts import redirect

class UserAuthenticatedMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.excluded_endpoints =[
            "/auth/google/callback",
            "/login"
        ]
    
    def __call__(self, request):
        path = request.path
        user = cache.get("user")

        if user is None and path not in self.excluded_endpoints:
            return redirect("/login")
        
        return self.get_response(request)
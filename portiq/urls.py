from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from rest_framework import routers
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import GoogleLogin
from portiq_server.viewsets import certificate_viewset, user_viewset
from react_server.views import serve_react
from .auth import login_with_google, logout_user

router = routers.DefaultRouter()
router.register(r'user', user_viewset.UserViewSet)
router.register(r'certificate', certificate_viewset.CertificateViewSet)
router.register(r'user-details', user_viewset.UserDetailsViewSet, basename='user-details')


urlpatterns = [
    path('admin/', admin.site.urls),

    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path("auth/google/callback", login_with_google, name="google_callback"),


    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/logout/', logout_user, name='logout'),
    
    path('api/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path("api/", include((router.urls, "api"))),
    
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]
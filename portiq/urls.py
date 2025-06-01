from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from rest_framework import routers
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import GoogleLogin
from portiq_server.viewsets import development_viewset, github_viewset, image_upload_viewset, linkedin_viewset, profile_component_viewset, user_viewset
from react_server.views import serve_react
from .auth import login_with_google, logout_user

router = routers.DefaultRouter()
router.register(r'user', user_viewset.UserViewSet)
router.register(r'user-details', user_viewset.UserDetailsViewSet, basename='user-details')
router.register(r'development', development_viewset.DevelopmentViewSet, basename='development')
router.register(r'profile-component', profile_component_viewset.ProfileComponentViewSet, basename='profile-component')
router.register(r'github', github_viewset.GithubViewSet, basename='github')
router.register(r'linkedin-data', linkedin_viewset.LinkeinViewSetDetails, basename='linkedin-data')
router.register(r'image-upload', image_upload_viewset.ImageUploadViewSet, basename='image-upload')

urlpatterns = [
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path("auth/google/callback", login_with_google, name="google_callback"),
    path("api/linkedin/oauth/redirect", linkedin_viewset.LinkedinViewSet.as_view({'get': 'linkedin_oauth_redirect'}), name='linkedin_oauth_redirect'),

    path('api/admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/logout/', logout_user, name='logout'),
    
    path('api/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path("api/", include((router.urls, "api"))),
    
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings

from react_server.views import serve_react

urlpatterns = [
    path('admin', admin.site.urls),
    path("api/", include("portiq_server.urls")),
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]

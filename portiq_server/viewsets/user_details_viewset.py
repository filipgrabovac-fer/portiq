from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema

from portiq_server.models.user import User
from portiq_server.serializers import UserDetailsSerializer
from portiq_server.models.certificate import Certificate
from portiq_server.models.education import Education
from portiq_server.models.skill import Skill
from portiq_server.models.project import Project
from django.core.cache import cache

class UserDetailsViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer

    @extend_schema(
        summary="Get current user details",
        description="Returns detailed information about the currently authenticated user",
        responses={
            200: UserDetailsSerializer,
            401: {"type": "object", "properties": {"error": {"type": "string"}}},
            404: {"type": "object", "properties": {"error": {"type": "string"}}}
        }
    )
    @action(detail=False, methods=['get'])
    def userDetails(self, request):
        cached_user = cache.get("user")
            
        userId = cached_user["id"]
        user = self.queryset.filter(id=userId).first()

        if not user:
            print("User not found in database")
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get the data and convert to list of lists
        certificates = [list(cert) for cert in Certificate.objects.filter(user_id=userId).values_list("id", "title", "description", "start_date", "end_date", "location", "link", "created_at")]
        education = [list(edu) for edu in Education.objects.filter(user_id=userId).values_list("id", "name", "description", "location", "type", "start_date", "end_date", "link", "created_at")]
        skills = [list(skill) for skill in Skill.objects.filter(user_id=userId).values_list("id", "title", "description", "location", "level", "link", "created_at")]
        projects = [list(proj) for proj in Project.objects.filter(user_id=userId).values_list("id", "title", "description", "date", "location", "created_at")]

        user_details = {
            "info": {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": user.phone_number,
                "image_url": user.image_url,
                "address": user.address,
                "city": user.city,
                "state": user.state,
                "zip_code": user.zip_code,
                "country": user.country,
            },
            "certificates": certificates,
            "education": education,
            "skills": skills,
            "projects": projects,
        }

        serializer = self.serializer_class(data=user_details)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            

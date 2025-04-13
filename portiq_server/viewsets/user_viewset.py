from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from portiq_server.models.qr_code import QRCode
from portiq_server.models.user import User
from portiq_server.serializers import UserSerializer, UserDetailsSerializer
from portiq_server.models.certificate import Certificate
from portiq_server.models.education import Education
from portiq_server.models.skill import Skill
from portiq_server.models.project import Project
from django.core.cache import cache

class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        users = list(self.queryset.values_list("id_user", "first_name", "last_name", "email", "phone_number", "image_url", "address", "city", "state", "zip_code", "country"))
        return JsonResponse({"users": users})
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        user = self.queryset.filter(id=pk).values()
        return Response(user, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        user = self.queryset.filter(id=pk).values()
        if user:
            user.update(request.data)
            return Response(user, status=status.HTTP_200_OK)
        else:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        user = self.queryset.filter(id=pk).values()
        if user:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)


class UserDetailsViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer

    @action(detail=False, methods=['get'], url_path="user-details")
    def userDetails(self, request):
        print("userDetails endpoint called")
        cached_user = cache.get("user")
        
        userId = cached_user["id_user"]
        user: User = self.queryset.filter(id_user=userId).first()

        # Get the data and convert to list of lists
        certificates = [list(cert) for cert in Certificate.objects.filter(id_user=userId).values_list("id_certificate", "title", "description", "start_date", "end_date", "location", "link", "created_at")]
        education = [list(edu) for edu in Education.objects.filter(id_user=userId).values_list("id_education", "name", "description", "location", "type", "start_date", "end_date", "link", "created_at")]
        skills = [list(skill) for skill in Skill.objects.filter(id_user=userId).values_list("id_skill", "title", "description", "location", "level", "link", "created_at")]
        projects = [list(proj) for proj in Project.objects.filter(id_user=userId).values_list("id_project", "title", "description", "date", "location", "created_at")]


        qr_code =  "QRCode.objects.filter(id_user=userId).first().qr_code"


        user_details = {
            "info": {
                "qr_code":qr_code,
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


        return Response(user_details, status=status.HTTP_200_OK)


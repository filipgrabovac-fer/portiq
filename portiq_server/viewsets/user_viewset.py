from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from portiq_server.models.github_data import GithubData
from portiq_server.models.hobby import Hobby
from portiq_server.models.language import Language
from portiq_server.models.other import Other
from portiq_server.models.reference import Reference
from portiq_server.models.user import User
from portiq_server.models.work_experience import WorkExperience
from portiq_server.serializers import PutUserDataSerializer, UserLoggedInSerializer, UserSerializer, UserDetailsSerializer
from portiq_server.models.certificate import Certificate
from portiq_server.models.education import Education
from portiq_server.models.skill import Skill
from portiq_server.models.project import Project
from django.core.cache import cache
from drf_spectacular.utils import extend_schema

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
    
    @extend_schema(
        request=PutUserDataSerializer,
    )
    def update(self, request, pk=None):
        id_user = cache.get("user")["id_user"]
        user = self.queryset.filter(id_user=id_user).first()

        userData = request.data
        userData["id_user"] = id_user

        serializer = self.serializer_class(user, data=userData)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        user = self.queryset.filter(id=pk).first()
        if user:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path="user-id")
    def getUserId(self, request):
        cached_user = cache.get("user")
        return Response({"id_user": cached_user["id_user"]}, status=status.HTTP_200_OK)

class UserDetailsViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer

    @action(detail=False, methods=['get'], url_path="user-details/(?P<userId>[^/.]+)?")
    def getUserDetails(self, request, userId):
        cached_user = cache.get("user")

        if not userId or userId == "x":
            userId = cached_user["id_user"]

        user: User = self.queryset.filter(id_user=userId).first()

        certificates = [list(cert) for cert in Certificate.objects.filter(id_user=userId).values_list("id_certificate", "title", "description", "start_date", "end_date", "location", "link", "created_at")]
        education = [list(edu) for edu in Education.objects.filter(id_user=userId).values_list("id_education", "title", "description", "location", "type", "start_date", "end_date", "link", "created_at")]
        skills = [list(skill) for skill in Skill.objects.filter(id_user=userId).values_list("id_skill", "title", "description", "location", "level", "link", "created_at")]
        projects = [list(proj) for proj in Project.objects.filter(id_user=userId).values_list("id_project", "title", "description", "start_date", "end_date", "location", "created_at")]
        
        languages = [list(lang) for lang in Language.objects.filter(id_user=userId).values_list("id_language", "title", "level", "created_at")]
        other = [list(other) for other in Other.objects.filter(id_user=userId).values_list("id_other", "title", "description", "start_date", "end_date", "location", "link", "created_at")]
        hobbies = [list(hobby) for hobby in Hobby.objects.filter(id_user=userId).values_list("id_hobby", "title", "description", "created_at")]

        work_experiences = [list(work_experience) for work_experience in WorkExperience.objects.filter(id_user=userId).values_list("id_work_experience", "title", "description", "start_date", "end_date", "location", "created_at")]
        references = [list(reference) for reference in Reference.objects.filter(id_user=userId).values_list("id_reference", "title", "description", "link", "created_at")]

        github_data = [list(github) for github in GithubData.objects.filter(id_user=userId).values_list( "avatar_url", "followers", "following", "public_repos", "github_url", "created_at")]

        user_details = {
            "info": [{
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
                "github_username": user.github_username,
            }],
            "certificates": [
                {
                    "id": cert[0],
                    "title": cert[1],
                    "description": cert[2],
                    "start_date": cert[3],
                    "end_date": cert[4],
                    "location": cert[5],
                    "link": cert[6],
                    "created_at": cert[7]
                } for cert in certificates
            ],
            "education": [
                {
                    "id": edu[0],
                    "title": edu[1],
                    "description": edu[2],
                    "location": edu[3],
                    "type": edu[4],
                    "start_date": edu[5],
                    "end_date": edu[6],
                    "link": edu[7],
                    "created_at": edu[8]
                } for edu in education
            ],
            "skills": [
                {
                    "id": skill[0],
                    "title": skill[1],
                    "description": skill[2],
                    "location": skill[3],
                    "level": skill[4],
                    "link": skill[5],
                    "created_at": skill[6]
                } for skill in skills
            ],
            "projects": [
                {
                    "id": proj[0],
                    "title": proj[1],
                    "description": proj[2],
                    "start_date": proj[3],
                    "end_date": proj[4],
                    "location": proj[5],
                    "created_at": proj[6]
                } for proj in projects
            ],
            "languages": [
                {
                    "id": lang[0],
                    "title": lang[1],
                    "level": lang[2],
                    "created_at": lang[3]
                } for lang in languages
            ],
            "other": [
                {
                    "id": other[0],
                    "title": other[1],
                    "description": other[2],
                    "start_date": other[3],
                    "end_date": other[4],
                    "location": other[5],
                    "link": other[6],
                    "created_at": other[7]
                } for other in other
            ],
            "hobbies": [
                {
                    "id": hobby[0],
                    "title": hobby[1],
                    "description": hobby[2],
                    "created_at": hobby[3]
                } for hobby in hobbies
            ],
            "work_experiences": [
                {
                    "id": work_experience[0],
                    "title": work_experience[1],
                    "description": work_experience[2],
                    "start_date": work_experience[3],
                    "end_date": work_experience[4],
                    "location": work_experience[5],
                    "created_at": work_experience[6]
                } for work_experience in work_experiences
            ],
            "references": [
                {
                    "id": reference[0],
                    "title": reference[1],
                    "description": reference[2],
                    "link": reference[3],
                    "created_at": reference[4]
                } for reference in references
            ],

            "github_data": [
                {
                    "avatar_url": github[0],
                    "followers": github[1],
                    "following": github[2],
                    "public_repos": github[3],
                    "github_url": github[4],
                    "created_at": github[5]
                } for github in github_data
            ]

        }

        return Response(user_details, status=status.HTTP_200_OK)


    @extend_schema(
        request=None,
        responses={
            200: UserLoggedInSerializer,
        }
    )
    @action(detail=False, methods=['get'], url_path="user-logged-in")
    def getUserLoggedIn(self, request):
        cached_user = cache.get("user")

        if cached_user:
            return Response({"id_user": cached_user["id_user"]}, status=status.HTTP_200_OK)
        else:
            return Response({"id_user": None}, status=status.HTTP_200_OK)
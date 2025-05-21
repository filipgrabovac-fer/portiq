import requests
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema
from portiq_server.models.github_data import GithubData
from portiq_server.models.user import User
from portiq_server.serializers import GithubRequestSerializer, GithubResponseSerializer
from django.core.cache import cache
class GithubViewSet(viewsets.ViewSet):
    @extend_schema(
        request=GithubRequestSerializer,
        responses={
            200: GithubResponseSerializer,
        }
    )
    @action(detail=False, methods=['post'], url_path="put-github-repos")
    def put_github_repos(self, request):
        username = request.data.get("username")
        userId = cache.get("user")["id_user"]

        user = User.objects.filter(id_user=userId).first()
        response = requests.get(f"https://api.github.com/users/{username}").json()

        github_data = {
            "avatar_url": response.get("avatar_url"),
            "github_url": response.get("html_url"),
            "public_repos": response.get("public_repos"),
            "followers": response.get("followers"),
            "following": response.get("following"),
        }

        gh = GithubData.objects.filter(id_user=userId).first()

        if gh:
            gh.avatar_url = github_data.get("avatar_url")
            gh.github_url = github_data.get("github_url")
            gh.public_repos = github_data.get("public_repos")
            gh.followers = github_data.get("followers")
            gh.following = github_data.get("following")
            gh.save()
        else:
            GithubData.objects.create(id_user=user, **github_data)

        return Response(github_data)
    

    @extend_schema(
        request=None,
        responses={
            200: GithubResponseSerializer,
        }
    )
    @action(detail=False, methods=['get'], url_path="get-github-data")
    def get_github_repos(self, request):
        userId = cache.get("user")["id_user"]
        user = User.objects.filter(id_user=userId).first()

        github_data = GithubData.objects.filter(id_user=user)

        if not github_data.exists():
            return Response({})
        
        github_data = github_data.first()
        serializer = GithubResponseSerializer(instance=github_data)

        return Response(serializer.data)
    

    @action(detail=False, methods=['delete'], url_path="delete-github-data")
    def delete_github_data(self, request):
        userId = cache.get("user")["id_user"]
        user = User.objects.filter(id_user=userId).first()

        github_data = GithubData.objects.filter(id_user=user).first()
        github_data.delete()
        return Response({"message": "Github data deleted"})
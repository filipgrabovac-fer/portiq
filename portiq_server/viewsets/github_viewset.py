import requests
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets

class GithubViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'], url_path="github-repos")
    def get_github_repos(self, request):

        response = requests.get("https://api.github.com/users/filipgrabovac/repos")

        print(response.json())

        return Response({"message": "Hello, world!"})
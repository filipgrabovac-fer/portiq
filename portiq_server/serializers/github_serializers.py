from rest_framework import serializers

class GithubRequestSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)


class GithubResponseSerializer(serializers.Serializer):
    public_repos = serializers.IntegerField(required=True)
    followers = serializers.IntegerField(required=True)
    following = serializers.IntegerField(required=True)
    avatar_url = serializers.CharField(required=True)
    github_url = serializers.CharField(required=True)

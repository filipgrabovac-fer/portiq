from rest_framework import serializers
from .models.user import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id", "first_name", "last_name", "email", "token", "phone_numer", "address", "city", "state", "zip_code", "country", "created_at"]

        
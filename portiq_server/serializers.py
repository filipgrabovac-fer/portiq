from rest_framework import serializers
from .models.user import User
from .models.certificate import Certificate
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id", "first_name", "last_name", "email", "token", "phone_numer", "address", "city", "state", "zip_code", "country", "created_at"]

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [ "id", "title", "description", "start_date", "end_date", "location", "link", "created_at"]

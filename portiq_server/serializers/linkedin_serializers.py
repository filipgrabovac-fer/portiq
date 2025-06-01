from rest_framework import serializers

class PutLinkedinDataSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    image_url = serializers.CharField(required=False)


class GetLinkedinDataSerializer(serializers.Serializer):
    sub = serializers.CharField(required=False)
    email_verified = serializers.BooleanField(required=False)
    name = serializers.CharField(required=False)
    locale = serializers.DictField(child=serializers.CharField(required=False))
    given_name = serializers.CharField(required=False)
    family_name = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    picture = serializers.CharField(required=False)
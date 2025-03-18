
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response

from portiq_server.models.user import User
from portiq_server.serializers import UserSerializer
from django.core.cache import cache
from drf_spectacular.utils import extend_schema

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        users = list(self.queryset.values_list("id", "first_name", "last_name", "email", "phone_number", "image_url", "address", "city", "state", "zip_code", "country"))
        return JsonResponse({"users": users})
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        user = self.queryset.filter(id=pk).values()

        if user:
            return Response(user, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
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

          
        
        

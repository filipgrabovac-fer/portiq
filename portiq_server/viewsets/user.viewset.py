
from rest_framework import viewsets
from rest_framework.response import Response

from ..models.user import User
from ..serializers import UserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
 
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)
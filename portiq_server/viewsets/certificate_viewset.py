from rest_framework import viewsets
from rest_framework.response import Response
from portiq_server.models.certificate import Certificate
from portiq_server.serializers import CertificateSerializer
from rest_framework.decorators import action
from rest_framework import status

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

    @action(detail=False, methods=['get'], url_path="(?P<user_id>\d+)/user-certificates")
    def user_certificates(self, request, user_id=None):
        certificates = self.queryset.filter(user_id = user_id).values_list()
        return Response(certificates)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        certificate = Certificate.objects.get(id_certificate=pk)
        serializer = self.serializer_class(certificate, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

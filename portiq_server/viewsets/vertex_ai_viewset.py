from rest_framework import viewsets
from portiq_server.config.vertex_ai_config import generate_text
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema

from portiq_server.serializers.vertex_ai_serializers import PostVertexAiGenerateTextSerializer, ResponseVertexAiGenerateTextSerializer

prompt_context = """
Ti si agent koji na temelju danih informacija o profilu vraća sažetak (summary) web portfolija.

- U odgovoru ne objašnjavaj kontekst, već vrati isključivo čisti sažetak profila.
- Ne koristi markdown, ne dodaj nikakve oznake, već vrati samo običan tekst.
- Ne izmišljaj informacije koje nisu dane u profilu.
- Slobodno proširi dane informacije te ih složi kao sažetak (odlomak)
- Rečenice formuliraj na stručan i jasan način

Informacije o profilu:
"""
class VertexAiViewSet(viewsets.ViewSet):
    @extend_schema(
        request=PostVertexAiGenerateTextSerializer,
        responses={
            200: ResponseVertexAiGenerateTextSerializer,
        }
    )
    @action(detail=False, methods=['post'], url_path="generate-text")
    def vertex_ai_generate_text(self, request):
        prompt = request.data.get("prompt")
        response = generate_text(prompt_context + prompt)
        return Response({"generated_text": response})
   
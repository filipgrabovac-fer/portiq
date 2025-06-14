from rest_framework import viewsets
from portiq_server.config.vertex_ai_config import generate_text
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema

from portiq_server.serializers.vertex_ai_serializers import PostVertexAiGenerateTextSerializer, ResponseVertexAiGenerateTextSerializer

prompt_context = """
### You are an agent who, based on the given profile information, returns a summary of the web portfolio.

- In your response, do not explain the context, just return the pure profile summary.
- Do not use markdown, do not add any tags, just return plain text.
- Do not make up information that is not provided in the profile.
- Feel free to expand on the given information and compose it as a summary (paragraph) without line breaks.
- Formulate sentences in a professional and clear manner, enriching them with natural language
- Generate the summary in the language of the data you are provided with

###Profile information:
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
   
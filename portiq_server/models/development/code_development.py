from django.db import models

from portiq_server.models.development.html_development import HtmlDevelopment
from portiq_server.models.development.css_development import CssDevelopment
from portiq_server.models.development.javascript_development import JavascriptDevelopment

class CodeDevelopment(models.Model):
    id = models.AutoField(primary_key=True)
    html_id = models.ForeignKey(HtmlDevelopment, on_delete=models.CASCADE)
    css_id = models.ForeignKey(CssDevelopment, on_delete=models.CASCADE)
    javascript_id = models.ForeignKey(JavascriptDevelopment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


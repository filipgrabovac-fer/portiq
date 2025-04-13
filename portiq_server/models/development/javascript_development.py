from django.db import models

class JavascriptDevelopment(models.Model):
    id_javascript_development = models.AutoField(primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
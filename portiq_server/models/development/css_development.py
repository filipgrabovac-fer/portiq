from django.db import models

class CssDevelopment(models.Model):
    id_css_development = models.AutoField(primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
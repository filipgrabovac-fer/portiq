from django.db import models

from portiq_server.models.project import Project


class ProjectLink(models.Model):
    id_project_link = models.AutoField(primary_key=True)
    id_project = models.ForeignKey(Project, on_delete=models.CASCADE)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.link

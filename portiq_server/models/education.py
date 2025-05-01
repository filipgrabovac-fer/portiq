from django.db import models

from portiq_server.models.user import User


class Education(models.Model):
    EDUCATION_TYPES = [
        ('primary_school', 'Primary School'),  
        ('high_school', 'High School'),       
        ('faculty', 'Faculty'),               
        ('course', 'Course'),                 
        ('workshop', 'Workshop'),             
        ('other', 'Other')                    
    ]

    id_education = models.AutoField(primary_key=True, null=False)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=EDUCATION_TYPES, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

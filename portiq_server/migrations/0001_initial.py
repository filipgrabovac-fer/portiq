# Generated by Django 5.1.7 on 2025-03-09 23:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CodeDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CssDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='HtmlDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='JavascriptDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('token', models.CharField(max_length=255)),
                ('phone_numer', models.CharField(blank=True, max_length=255, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('state', models.CharField(blank=True, max_length=255, null=True)),
                ('zip_code', models.CharField(blank=True, max_length=255, null=True)),
                ('country', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CertificateDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.AddField(
            model_name='codedevelopment',
            name='css_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.cssdevelopment'),
        ),
        migrations.CreateModel(
            name='EducationDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='HobbyDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.AddField(
            model_name='codedevelopment',
            name='html_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.htmldevelopment'),
        ),
        migrations.AddField(
            model_name='codedevelopment',
            name='javascript_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.javascriptdevelopment'),
        ),
        migrations.CreateModel(
            name='OtherDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='SkillDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='SocialMediaLink',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('platform', models.CharField(max_length=255)),
                ('link', models.URLField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('level', models.CharField(choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('professional', 'Professional')], max_length=20)),
                ('link', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='ProfessionalSummary',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('summary', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='Other',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('link', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='Hobby',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('location', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('primary_school', 'Primary School'), ('high_school', 'High School'), ('faculty', 'Faculty'), ('course', 'Course'), ('workshop', 'Workshop'), ('other', 'Other')], max_length=20)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('link', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('acquired_skills', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('link', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserInfoDevelopment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.codedevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='PortfolioTemplate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('private', 'Private'), ('public', 'Public')], max_length=255)),
                ('certificate_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.certificatedevelopment')),
                ('education_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.educationdevelopment')),
                ('hobby_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.hobbydevelopment')),
                ('other_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.otherdevelopment')),
                ('project_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.projectdevelopment')),
                ('skill_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.skilldevelopment')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
                ('user_info_development_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='portiq_server.userinfodevelopment')),
            ],
        ),
        migrations.CreateModel(
            name='UserPortfolioTemplate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('portfolio_template_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.portfoliotemplate')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserSkill',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('skill_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.skill')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portiq_server.user')),
            ],
        ),
    ]

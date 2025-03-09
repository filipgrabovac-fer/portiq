from django.db import models

from portiq_server.models.user import User
from portiq_server.models.portfolio_template import PortfolioTemplate


class UserPortfolioTemplate(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    portfolio_template_id = models.ForeignKey(PortfolioTemplate, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

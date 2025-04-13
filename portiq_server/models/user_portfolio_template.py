from django.db import models

from portiq_server.models.user import User
from portiq_server.models.portfolio_template import PortfolioTemplate


class UserPortfolioTemplate(models.Model):
    id_user_portfolio_template = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_portfolio_template = models.ForeignKey(PortfolioTemplate, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

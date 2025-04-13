from portiq_server.models.user import User
from django.db import models


class QRCode(models.Model):
    id_qr_code = models.AutoField(primary_key=True, null=False)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    qr_code = models.ImageField(
        null=False,
        max_length=10000
    )
    created_at = models.DateTimeField(auto_now_add=True)
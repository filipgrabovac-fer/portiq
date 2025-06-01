import cloudinary
from portiq.settings import env

cloudinary.config(
    cloud_name=env("CLOUDINARY_CLOUD_NAME"),
    api_key=env("CLOUDINARY_CLIENT_ID"),
    api_secret=env("CLOUDINARY_CLIENT_SECRET"),
    secure=True,
)
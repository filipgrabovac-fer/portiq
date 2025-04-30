import os
from pathlib import Path
import environ


BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-siy6g$u&^1(u1bc)5&9n4^9zg-s1we_cxsvk^*_c)2-)vz2d#f'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

env = environ.Env(
    ALLOWED_HOSTS=(list, []),
    DB_NAME=(str, ''),
    DB_USER=(str, ''),
    DB_PASSWORD=(str, ''),
    DB_HOST=(str, ''),
    DB_PORT=(int, 0),
    GOOGLE_CLIENT_ID=(str, ''),
    GOOGLE_CLIENT_SECRET=(str, ''),
    GOOGLE_REDIRECT_URI=(str, ''),
)

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "react_server",
    "portiq_server",
    'corsheaders', 
    "rest_framework",
    "rest_framework.authtoken",
    
    "drf_spectacular",
    "django.contrib.sites",

    
    'allauth',
    'allauth.account',
    "allauth.socialaccount.providers.google",
    "dj_rest_auth",

    'dj_rest_auth.registration',
    'allauth.socialaccount',
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "portiq.middleware.user_authenticated.UserAuthenticatedMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = 'portiq.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portiq.wsgi.application'



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }

}



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
REACT_APP_BUILD_PATH = BASE_DIR / "dist"

CORS_ALLOW_ALL_ORIGINS = True 



REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'PortIQ API',
    'DESCRIPTION': 'PortIQ API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SERVERS': [
        {'url': 'http://localhost:8000', 'description': 'Local Development server'},
    ],
    'TAGS': [
    {
        'name': 'user',
        'description': 'User management endpoints'
    },
    {
        'name': 'certificate',
        'description': 'Certificate management endpoints'
    },
    {
        'name': 'logout',
        'description': 'Authentication related endpoints'
    },
    {
        'name': 'user-details',
        'description': 'User details endpoints'
    },
    {
        'name': 'development',
        'description': 'Development endpoints'
    },
    {
        'name': 'profile-component',
        'description': 'Profile component endpoints'
    },
    ],
    'SCHEMA_PATH_PREFIX': '/api/',
}



AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': env("GOOGLE_CLIENT_ID"),
            'secret': env("GOOGLE_CLIENT_SECRET"),
        }
    }
}

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Add to INSTALLED_APPS if not already there
if 'django.contrib.staticfiles' not in INSTALLED_APPS:
    INSTALLED_APPS.append('django.contrib.staticfiles')
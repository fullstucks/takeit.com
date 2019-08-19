DEBUG = True

ALLOWED_HOSTS = ['localhost','127.0.0.1', "*"]
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:4200',
    'http://localhost:8000'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'takeit',
        #'USER': 'postgres',
        #'PASSWORD': 'abcd5678',
        'USER': 'mglpg',
        'PASSWORD': 'xxxxxx',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
DEBUG = True

ALLOWED_HOSTS = ['localhost','127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'takeit',
        'USER': 'mglpg',
        'PASSWORD': 'xxxxxx',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
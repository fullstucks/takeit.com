DEBUG = True

ALLOWED_HOSTS = ['localhost']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'one',
        'USER': 'mglpg',
        'PASSWORD': 'xxxxxx',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
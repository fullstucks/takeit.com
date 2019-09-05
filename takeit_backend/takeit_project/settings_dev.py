DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'http://localhost:4200']
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
   'http://localhost:4200',
    'http://localhost:8000',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'takeit',
        'USER': '',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '5432',
   }


#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql',
#        'NAME': 'eniebmsy',
#        'USER': 'eniebmsy',
#        'PASSWORD': 'hAcUudJGv2SdeL5YHAqUidbgjVwU0TBq',
#        'HOST': 'motty.db.elephantsql.com',
#        'PORT': '5432',
#    }
#}
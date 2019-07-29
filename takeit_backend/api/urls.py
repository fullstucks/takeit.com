from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import ObtainJSONWebToken , RefreshJSONWebToken
from .views import RegistrationView

router = routers.DefaultRouter()

urlpatterns = [
    #path(r'', include(router.urls)),
    path(r'auth/', ObtainJSONWebToken.as_view()),
    path(r'auth/refresh/', RefreshJSONWebToken.as_view()),
    path(r'signup/', RegistrationView.as_view())
]
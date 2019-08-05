from django.urls import path
#from rest_framework import routers
from rest_framework_jwt.views import ObtainJSONWebToken, RefreshJSONWebToken
from . import views 

#router = routers.DefaultRouter()

urlpatterns = [
    #path(r'', include(router.urls)),
    path(r'auth/', ObtainJSONWebToken.as_view()),
    path(r'auth/refresh/', RefreshJSONWebToken.as_view()),
    path(r'signup/', views.RegistrationView.as_view()),
    path(r'restaurante/', views.RestauranteView.as_view()),
    path(r'restaurante/<int:id>/', views.RestauranteView.as_view()),
    path(r'restaurante/recomendados/', views.RestauranteListView.as_view()),
    
]
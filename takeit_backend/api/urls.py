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
    path(r'restaurante/listas/', views.RestauranteListView.as_view()),
    path(r'restaurante/fotos/', views.FotosRestauranteView.as_view()),
    path(r'zona/', views.ZonaView.as_view()),
    path(r'reserva/', views.ReservaView.as_view()),
    path(r'planificacion/', views.ReservaPlanificacionView.as_view()),
    path(r'resena/', views.ResenaView.as_view()),
]
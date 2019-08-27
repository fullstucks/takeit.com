from django.urls import path
from rest_framework_jwt.views import RefreshJSONWebToken,ObtainJSONWebToken
from . import views 

#from rest_framework import routers
#router = routers.DefaultRouter()

urlpatterns = [
    #path(r'', include(router.urls)),
    #path(r'auth/', ObtainJSONWebToken.as_view()),
    path(r'auth/', views.JWTAuthView.as_view()),
    path(r'auth/refresh/', RefreshJSONWebToken.as_view()),
    path(r'auth/user/info/', views.UsuarioView.as_view()),
    path(r'signup/', views.RegistrationView.as_view()),
    path(r'restaurante/', views.RestauranteView.as_view()),
    path(r'restaurante/restaurantes_fav_or_owned/', views.RestauranteFavOwned.as_view()),
    path(r'restaurante/listas/', views.RestauranteListView.as_view()),
    path(r'restaurante/fotos/', views.FotosRestauranteView.as_view()),
    path(r'zona/', views.ZonaView.as_view()),
    path(r'zona/list/', views.ZonaListView.as_view()),
    path(r'tag/list/', views.TagListView.as_view()),
    path(r'reserva/', views.ReservaView.as_view()),
    path(r'planificacion/', views.ReservaPlanificacionView.as_view()),
    path(r'resena/', views.ResenaView.as_view()),
]
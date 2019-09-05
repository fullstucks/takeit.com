from rest_framework import serializers
#from rest_framework_jwt.settings import api_settings
from .models import *


class UsuarioSerializer(serializers.ModelSerializer):

    fecha_nacimiento = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Usuario
        field = 'fecha_nacimiento'
        exclude = ['password', 'id', 'user_permissions']


class UsuarioProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        exclude = ['is_staff', 'is_superuser', 'password']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = '__all__'


class ZonaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zona
        fields = '__all__'


class FotosRestauranteSerializer(serializers.ModelSerializer):

    class Meta:
        model = FotosRestaurante
        fields = '__all__'


class RestauranteSerializer(serializers.ModelSerializer):

    img_paths = FotosRestauranteSerializer(many=True)

    class Meta:
        model = Restaurante
        fields = '__all__'
        field = 'img_paths'
        depth = 1


class RestauranteSaverSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurante
        exclude = ['tags']


class ResenaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resena
        exclude = ['restaurante']


class ReservaPlanificacionSerializer(serializers.ModelSerializer):

    fecha = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = ReservaPlanificacion
        fields = ['id', 'restaurante', 'mesas_totales', 'mesas_disponibles', 'fecha']
        depth = 1


class ReservaPlanificacionSaverSerializer(serializers.ModelSerializer):

    fecha = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = ReservaPlanificacion
        fields = ['restaurante', 'mesas_totales', 'mesas_disponibles', 'fecha']


class ReservaSerializer(serializers.ModelSerializer):

     #reserva_planificacion = ReservaPlanificacionSerializer()

    class Meta:
        model = Reserva
        fields = '__all__'
        #depth = 1


class ReservaSaverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'
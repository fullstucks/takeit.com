from rest_framework import serializers
#from rest_framework_jwt.settings import api_settings
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):

    fecha_nacimiento = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Usuario
        field = 'fecha_nacimiento'
        exclude = ['password', 'id', 'user_permissions']

    def create(self, validated_data):

        user = Usuario.objects.create_user(username=validated_data['username'],
                                           email=validated_data['email'],
                                           password=validated_data['password'])
        user.fecha_nacimiento = validated_data['fecha_nacimiento']
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.save()
        return user


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
        fields = ['id','restaurante', 'mesas_totales', 'mesas_disponibles', 'fecha']


class ReservaSerializer(serializers.ModelSerializer):

    reserva_planificacion = ReservaPlanificacionSerializer()

    class Meta:
        model = Reserva
        fields = ['reserva_planificacion', 'asistio', 'detalles']
        #depth = 1


class ReservaSaverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'
        




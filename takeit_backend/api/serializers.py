from rest_framework import serializers
#from rest_framework_jwt.settings import api_settings
from .models import Usuario, Tag, Resena, Zona, Reserva, ReservaPlanificacion, Restaurante, FotosRestaurante


class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = '__all__'
    
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
        exclude = ['is_staff','is_superuser', 'is_active', 'password']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['tag']

class ZonaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zona
        fields = '__all__'

class RestauranteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurante
        fields = '__all__'

class RestauranteSearchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Restaurante
        fields = ['nombre','ubicacion', 'zona']

class FotosRestauranteSerializer(serializers.ModelSerializer):

    class Meta:
        model = FotosRestaurante
        exclude = ['restaurante']

class ResenaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resena
        exclude = ['restaurante']

class ReservaPlanificacionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ReservaPlanificacion
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reserva
        fields = '__all__'

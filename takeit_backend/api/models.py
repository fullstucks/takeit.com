from django.db import models

# Create your models here.
class Restaurante(models.Model):
    nombre = models.CharField(max_length = 20)
    descripcion = models.CharField(max_length = 400)
    n_reservas = models.IntegerField()
    ubicacion = models.CharField(max_length = 200)
    n_estrellas = models.IntegerField()
    lat = models.FloatField()
    lng = models.FloatField()

class Usuario(models.Model):
    nombre = models.CharField(max_length = 20)
    apellido = models.CharField(max_length = 20)
    fecha_nac = models.DateTimeField()
    correo = models.CharField(max_length = 50)
    img_url = models.CharField(max_length = 50)
    username = models.CharField(max_length = 20)
    password = models.CharField(max_length = 64)

class Resena(models.Model):
    id_usuario = models.IntegerField()
    id_restaurante = models.IntegerField()
    calificacion_general = models.FloatField()
    calificacion_comida = models.FloatField()
    calificacion_servicio = models.FloatField()
    calificacion_ambiente = models.FloatField()
    comentario = models.TextField()
    fecha = models.DateTimeField()

class Zona(models.Model):
    nombre = models.CharField(max_length = 20)
    n_restaurantes = models.IntegerField()
    img_path = models.CharField(max_length = 50)

class Tag(models.Model):
    tag = models.CharField(max_length = 20)
    veces_usado = models.IntegerField()

class ReservasPlanificacion(models.Model):
    id_restaurante = models.ForeignKey(
        'Restaurante',
        on_delete = models.CASCADE,
    )
    mesas_totales = models.IntegerField()
    mesas_disponibles = models.IntegerField()
    fecha = models.DateTimeField()

class Reserva(models.Model):
    id_resPlan = models.ForeignKey(
        'ReservasPlanificacion',
        on_delete = models.CASCADE,
    )
    fecha = models.DateTimeField()
    asistio = models.BooleanField()
    asientos =  models.IntegerField() 
    detalles =  models.CharField(max_length = 80)
    id_usuario = models.ForeignKey(
        'Usuario',
        on_delete = models.CASCADE,
    )
    id_restaurante = models.ForeignKey(
        'Restaurante',
        on_delete = models.CASCADE,
    )

class RestauranteFavorito(models.Model):
    id_usuario = models.ForeignKey(
        'Usuario',
        on_delete = models.CASCADE,
    )
    id_restaurante = models.ForeignKey(
        'Restaurante',
        on_delete = models.CASCADE,
    )

class FotosRestaurante(models.Model):
    id_restaurante = models.ForeignKey(
        'Restaurante',
        on_delete = models.CASCADE,
    )
    img_path = models.CharField(max_length = 50)
    tipo = models.CharField(max_length = 10)

class RestauranteTag(models.Model):
    id_tag = models.ForeignKey(
        'Tag',
        on_delete = models.CASCADE,
    )
    id_restaurante = models.ForeignKey(
        'Restaurante',
        on_delete = models.CASCADE,
    )
    
class RestauranteZona(models.Model):
    id_restaurante = models.ForeignKey(
        'Restaurante',
        on_delete = models.CASCADE,
    )
    id_zona = models.ForeignKey(
        'Zona',
        on_delete = models.CASCADE,
    )
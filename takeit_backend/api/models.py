from django.db import models
from django.contrib.auth.models import AbstractUser


class Tag(models.Model):
    tag         = models.CharField(max_length = 20)
    veces_usado = models.IntegerField(default=0)

    def __str__(self):
        return "" + self.tag

class Zona(models.Model):
    nombre          = models.CharField(max_length = 20)
    n_restaurantes  = models.IntegerField(default=0)
    img_path        = models.CharField(max_length = 50)

    def __str__(self):
        return "" + self.nombre

class Restaurante(models.Model):
    nombre      = models.CharField(max_length = 20)
    descripcion = models.CharField(max_length = 400)
    n_resenas   = models.IntegerField(default=0)
    ubicacion   = models.CharField(max_length = 200)
    zona        = models.ForeignKey(Zona, on_delete=models.CASCADE)
    calificacion_prom = models.IntegerField(default=0)
    lat         = models.FloatField()
    lng         = models.FloatField()
    tags        = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return "" + self.nombre

class FotosRestaurante(models.Model):
    restaurante     = models.ForeignKey( Restaurante, on_delete = models.CASCADE)
    img_path        = models.CharField(max_length = 50)
    tipo            = models.CharField(max_length = 10)
    tamano          = models.CharField(max_length = 10, default='small')

    def __str__(self):
        return "{} {} {}".format(self.restaurante , self.tipo, self.tamano)

class Usuario(AbstractUser):

    fecha_nacimiento       = models.DateField(blank=True, null=True)
    img_url                = models.CharField(max_length = 50, blank = True)
    restaurantes_favoritos = models.ManyToManyField(Restaurante, blank=True)

    def __str__(self):
        return "{} | {}".format(self.username, self.email)

class Resena(models.Model):
    usuario             = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    restaurante         = models.ForeignKey(Restaurante, on_delete=models.CASCADE)
    calificacion_general    = models.FloatField(default = 0.0)
    calificacion_comida     = models.IntegerField()
    calificacion_servicio   = models.IntegerField()
    calificacion_ambiente   = models.IntegerField()
    comentario              = models.TextField()
    fecha                   = models.DateTimeField(default= 0)

    def save(self, *args, **kwargs):
        total = self.calificacion_comida + self.calificacion_ambiente + self.calificacion_servicio
        self.calificacion_general =  total/3
        super(Resena, self).save(*args, **kwargs)

    def __str__(self):
        return "{} {}".format(self.usuario, self.comentario)

class ReservaPlanificacion(models.Model):
    restaurante      = models.ForeignKey(Restaurante, on_delete = models.CASCADE)
    mesas_totales    = models.IntegerField()
    mesas_disponibles= models.IntegerField()
    fecha            = models.DateTimeField()

    def __str__(self):
        return "{} {} {}".format(self.restaurante, self.mesas_disponibles, self.fecha)

class Reserva(models.Model):
    reserva_planificacion  = models.ForeignKey(ReservaPlanificacion, on_delete = models.CASCADE)
    fecha       = models.DateTimeField()
    asistio     = models.BooleanField()
    asientos    = models.IntegerField() 
    detalles    = models.CharField(max_length = 80)
    usuario     = models.ForeignKey( Usuario, on_delete = models.CASCADE)

    def __str__(self):
        return "{} {}".format(self.usuario, self.fecha)

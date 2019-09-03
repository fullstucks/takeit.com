from django.db.models import Q
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import ObtainJSONWebToken

from .serializers import *
from .models import *
from .to_mongo import *
from bson.json_util import dumps, loads
from datetime import datetime
from random import randint


class JWTAuthView(ObtainJSONWebToken):

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = {
                api_settings.JWT_AUTH_COOKIE: token,
                'username': user.username,
                'es_admin_restaurante': user.es_admin_restaurante
            }
            response = Response(data=response_data)
            if api_settings.JWT_AUTH_COOKIE:
                print("<------------------adentro")
                expiration = (datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True)

                print(response.cookies)
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsuarioView(GenericAPIView):
    serializer_class = UsuarioProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # print(request.user.fecha_nacimiento)
        serializer = self.get_serializer(request.user)

        return Response(serializer.data)


class RegistrationView(GenericAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        return render(request, '404.html')

    def post(self, request):

        user = Usuario.objects.create_user(username=request.data['username'],
                                           email=request.data['email'],
                                           password=request.data['password'])
        print("<--------------------->")
        user.fecha_nacimiento = request.data['fecha_nacimiento']
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.email = request.data['email']
        user.es_admin_restaurante = request.data['es_admin_restaurante']
        user.save()
        
        # Envío de mail de confirmación
        subject = "Confirmación de Registro Takeit.com"
        msg = "Hola " + user.first_name + user.last_name + ".\nGracias por verificar tu cuenta, has sido registrado exitosamente."
        from_email = settings.EMAIL_HOST_USER
        to_list = [user.email]
        send_mail(subject, msg, from_email, to_list, fail_silently=False)
        print(subject)
        print(msg)
        print(from_email)
        print(to_list)


        # return Response(data={'msg': 'uuuupppssssss'})
        print(user)
        
        # except Exception as error:
        # return Response(data={'msg': str(error)})
        return Response(data={'msg': 'Registrado con éxito'}, status=200)

        #id = request.POST.get('id')
        #client = Client.objects.get(id=id)
        #msg_html = render_to_string('templates/email.html', {'client': client})
        #template_email_text = ''
        # return send_mail('Lelander work samples', template_email_text, 'test@e


class RestauranteView(GenericAPIView):
    serializer_class = RestauranteSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        restaurant_id = request.query_params.get('restaurante_id')

        if not restaurant_id:
            return Response(status=400,
                            data={'msg': 'at least you should send the id of the entity'})

        try:
            data = Restaurante.objects.get(pk=restaurant_id)
        except Restaurante.DoesNotExist:
            return Response(status=400, data={'msg': 'no results for id: ' + restaurant_id})

        serializer = self.get_serializer(data)
        return Response(data=serializer.data)

    def get_random_img(self):
        img_path = {
            'img_path': str(randint(1, 5)) + '.jpg',
            'tipo': 'profile',
            'tamano': 'medium'
        }
        return img_path

    def post(self, request):
        print("<-------------------------->")

        serializer = RestauranteSaverSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        saved = serializer.save()
        print("<-----------  yep --------------->")

        try:
            tags_ids = loads(request.data['tags'])
        except:
            return Response(data={'msg': 'bad tag format.'})
        for tag_id in tags_ids:
            tag = Tag.objects.get(pk=tag_id)
            print(tag)
            tag.veces_usado += 1
            tag.save()
            saved.tags.add(tag)

        saved.save()
        random_img = self.get_random_img()
        fr = FotosRestaurante(
            restaurante=saved,
            img_path=random_img['img_path'],
            tipo=random_img['tipo'],
            tamano=random_img['tamano']
        )
        fr.save()

        request.user.restaurantes_fav_or_owned.add(saved)

        insert_restaurante({
            'id': saved.id,
            'nombre': saved.nombre,
            'ubicacion': saved.ubicacion,
            'zona': saved.zona.id,
            'descripcion': saved.descripcion,
            'n_resenas': saved.n_resenas,
            'calificacion_prom': saved.calificacion_prom,
            'lat': saved.lat,
            'lng': saved.lng,
            'img_paths': [random_img],
            'tags': [{'tag_id': tag.id, 'tag_name': tag.tag} for tag in saved.tags.all()]
        })

        return Response(status=200, data={'msg': 'created'})


class RestauranteModifyView(GenericAPIView):

    def put(self, request, restaurante_id):
        print("<-------------------------->")

        restaurante = Restaurante.objects.get(pk=restaurante_id)
        serializer = RestauranteSaverSerializer(restaurante, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        saved = serializer.save()
        print("<-----------  yep --------------->")

        saved.tags.clear()
        try:
            tags_ids = loads(request.data['tags'])
        except:
            return Response(data={'msg': 'bad tag format.'})
        for tag_id in tags_ids:
            tag = Tag.objects.get(pk=tag_id)
            print(tag)
            tag.veces_usado += 1
            tag.save()
            saved.tags.add(tag)

        saved.save()

        delete_restaurant(saved.id)
        insert_restaurante({
            'id': saved.id,
            'nombre': saved.nombre,
            'ubicacion': saved.ubicacion,
            'zona': saved.zona.id,
            'descripcion': saved.descripcion,
            'n_resenas': saved.n_resenas,
            'calificacion_prom': saved.calificacion_prom,
            'lat': saved.lat,
            'lng': saved.lng,
            'img_paths': [
                {
                    'id':img_path.id,
                    'img_path': img_path.img_path,
                    'tipo': img_path.tipo,
                    'tamano': img_path.tamano
                } for img_path in saved.img_paths.all()
            ],
            'tags': [
                {
                    'tag_id': tag.id, 
                    'tag_name': tag.tag
                } for tag in saved.tags.all()]
        })

        return Response(status=200, data={'msg': 'created'})


    def delete(self, request, restaurante_id):
        restaurante = Restaurante.objects.get(pk=restaurante_id)
        restaurante.delete()
        delete_restaurant(restaurant_id)
        return Response({'msg': 'yes'})


class RestauranteFavOwned(GenericAPIView):

    serializer_class = RestauranteSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        restaurantes = request.user.restaurantes_fav_or_owned

        print("<--------------------------->")
        print(restaurantes)
        print("<--------------------------->")
        serializer = self.get_serializer(restaurantes, many=True)

        return Response(data=serializer.data)


class RestauranteListView(GenericAPIView):
    serializer_class = RestauranteSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        data = []
        top = request.query_params.get('top')
        search_input = request.query_params.get('search_input')
        recomended = request.query_params.get('get_recomended')
        tag_id = request.query_params.get('tag_id')

        # < --------- using mongo ----------->
        if recomended == '1':
            data = get_restaurant_recomended(5)
        elif tag_id:
            data = get_restaurant_by_tag(tag_id)
        elif not top and not search_input:
            data = get_restaurante_all()
        else:
            top = top if top else '10'
            search_input = search_input if search_input else ''
            data = get_restaurant_by_search_input(search_input, top)

        # < --------- using postgres ----------->
        # if recomended == '1':
        #    data = Restaurante.objects.order_by(
        #        'calificacion_prom', 'n_resenas')[:5]
        # elif tag_id:
        #    data = Restaurante.objects.filter(tags__id=tag_id)
        # elif not top and not search_input:
        #    data = Restaurante.objects.all()
        # else:
        #    top = top if top else '10'
        #    search_input = search_input if search_input else ''
        #    data = Restaurante.objects.filter(
        #        Q(nombre__icontains=search_input) |
        #        Q(descripcion__icontains=search_input) |
        #        Q(ubicacion__icontains=search_input)
        #    )[:int(top)]

        return Response(data=loads(dumps(data)))


class ReservaView(GenericAPIView):
    serializer_class = ReservaSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        user_id = request.query_params.get('user_id')

        reservas = []
        if not user_id:
            return Response(status=400,
                            data={'msg': 'at least you should send the id of the user'})

        try:
            reservas = Reserva.objects.filter(usuario_id=user_id)
        except Reserva.DoesNotExist:
            return Response(status=400, data={'msg': 'no results for id: ' + user_id})

        serializer = self.get_serializer(reservas, many=True)
        return Response(data=serializer.data)

    def post(self, request):

        serializer = ReservaSaverSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        serializer.save()
        return Response(data={'msg': 'Registrado con éxito'}, status=200)


class ReservaPlanificacionView(GenericAPIView):
    serializer_class = ReservaPlanificacionSerializer

    def get(self, request):
        data = []
        id_restaurante = request.query_params.get('id_restaurante')
        if not id_restaurante:
            return Response(status=200, data={'msg': 'at least you should send the id of the entity'})

        data = ReservaPlanificacion.objects.filter(Q(restaurante=id_restaurante) &
                                                   Q(mesas_disponibles__gt=0))
        serializer = self.get_serializer(data, many=True)
        return Response(data=serializer.data)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            print(request.user)
            serializer.usuario = request.user
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        serializer.save()
        return Response(data={'msg': 'Registrado con éxito'}, status=200)


class ResenaView(GenericAPIView):
    serializer_class = ResenaSerializer

    def get(self, request):
        resenas = []
        id_restaurante = request.query_params.get('id_restaurante')
        id_usuario = request.query_params.get('id_usuario')

        if not id_restaurante and not id_usuario:
            return Response(status=200, data={'msg': 'at least you should send the id of the entity'})
        elif not id_restaurante:
            resenas = Resena.objects.filter(usuario=id_usuario)
        elif not id_usuario:
            resenas = Resena.objects.filter(restaurante=id_restaurante)
        else:
            resenas = Resena.objects.filter(
                Q(restaurante=id_restaurante) &
                Q(usuario=id_usuario)
            )

        serializer = self.get_serializer(resenas, many=True)
        return Response(data=serializer.data)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        serializer.save()
        return Response(data={'msg': 'Registrado con éxito'}, status=200)


class ZonaView(GenericAPIView):
    serializer_class = ZonaSerializer

    def get(self, request):
        top = request.query_params.get('top')
        top = top if top else '9'

        zona_id = request.query_params.get('zona_id')

        if zona_id:
            data = Zona.objects.get(pk=zona_id)
            serializer = self.get_serializer(data)
            return Response(data=serializer.data)

        data = Zona.objects.order_by('n_restaurantes')[:int(top)]
        serializer = self.get_serializer(data, many=True)
        return Response(data=serializer.data)


class ZonaListView(GenericAPIView):
    serializer_class = ZonaSerializer

    def get(self, request):
        data = Zona.objects.all()
        serializer = self.get_serializer(data, many=True)
        return Response(data=serializer.data)


class FotosRestauranteView(GenericAPIView):

    serializer_class = FotosRestauranteSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        foto_id = request.query_params.get('foto_id')
        if not foto_id:
            return Response(status=400, data={'msg': 'at least you should send the id of the entity'})
        try:
            data = FotosRestaurante.objects.get(pk=foto_id)
        except FotosRestaurante.DoesNotExist:
            return Response(status=400, data={'msg': 'no results for id: ' + foto_id})

        serializer = self.get_serializer(data)

        return Response(serializer.data)

    def post(self, request):

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        serializer.save()
        add_photo_restaurant(request.data['restaurante'], {
            'img_path': request.data['img_path'],
            'tipo': request.data['tipo'],
            'tamano': request.data['tamano']
        })
        return Response(data={'msg': 'Registrado con éxito'}, status=200)


class TagListView(GenericAPIView):
    serializer_class = TagSerializer

    def get(self, request):
        data = Tag.objects.all()
        serializer = self.get_serializer(data, many=True)
        return Response(data=serializer.data)

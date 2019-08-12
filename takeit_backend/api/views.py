from django.db.models import Q
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from .serializers import *
from .models import *
from .to_mongo import *
from bson.json_util import dumps, loads




class RegistrationView(GenericAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        return render(request, '404.html')

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as error:
            return Response(data={'msg': str(error)})

        return Response(data={'msg': 'Registrado con éxito'}, status=200)



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
        
        insert_restaurante({
            'id': saved.id,
            'nombre': saved.nombre,
            'ubicacion':saved.ubicacion,
            'zona': saved.zona.id,
            'descripcion': saved.descripcion,
            'n_resenas': saved.n_resenas,
            'calificacion_prom': saved.calificacion_prom,
            'lat': saved.lat,
            'lng': saved.lng,
            'img_paths': [],
            'tags':[{'tag_id': tag.id, 'tag_name': tag.tag} for tag in saved.tags.all()]
        })

        return Response(status=200, data={'msg': 'created'})


    def put(self):
        pass



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
        #if recomended == '1':
        #    data = Restaurante.objects.order_by(
        #        'calificacion_prom', 'n_resenas')[:5]
        #elif tag_id:
        #    data = Restaurante.objects.filter(tags__id=tag_id)
        #elif not top and not search_input:
        #    data = Restaurante.objects.all()
        #else:
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
            return Response(status=200, data={'msg': 'at least you should send the id of the entity'} )
        
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
            return Response(status=200, data={'msg': 'at least you should send the id of the entity'} )
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


from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
from .serializers import UsuarioSerializer, RestauranteSerializer
from .models import Restaurante

def index(req):
    return render(req, 'index.html')


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
        except ValidationError as e:
            return Response(data={'msg': str(e)})
        return Response(data={'msg':'Registrado con éxito'})


class RestauranteView(GenericAPIView):
    serializer_class = RestauranteSerializer

    def get(self):
        pass
    def post(self):
        pass
    def put(self):
        pass


class RestauranteListView(GenericAPIView):
    serializer_class = RestauranteSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        data = []
        top = request.query_params.get('top')
        search_input = request.query_params.get('search_input')
        
        if not top and not search_input:
            data = Restaurante.objects.all()
        else:
            top = top if top else '10'
            search_input = search_input if search_input else ''
            data = Restaurante.objects.filter(
                Q(nombre__icontains=search_input)|
                Q(descripcion__icontains=search_input)|
                Q(ubicacion__icontains=search_input)
            )[:int(top)]
  
        serializer = self.get_serializer(data, many=True)

        return Response(serializer.data)





from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from .serializers import UsuarioSerializer

def index(req):
    return render(req, 'index.html')


class RegistrationView(GenericAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        return render(request, '404.html')

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response(data={'msg': str(e)})
        return Response(data='zzzzzzzzzzzzzzzzzzz')
#{'msg': 'Registrado con éxito'}

class RestauranteView(APIView):

    def get(self, request):
        pass



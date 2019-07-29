from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

def index(req):
    return render(req, 'index.html')


class RegistrationView(APIView):
    def get(self, request):
        return render(request, 'forms/signup.html')

    def post(self, request):
        return Response(data={'uno', 'dos'})

class RestauranteView(APIView):

    def get(self, request):
        pass



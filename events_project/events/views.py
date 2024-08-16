from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the EventManager API!")

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

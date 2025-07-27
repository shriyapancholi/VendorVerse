from django.shortcuts import render

# Create your views here.
# inventory/views.py

from rest_framework import generics
from .models import InventoryItem
from .serializers import InventoryItemSerializer

class InventoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

class InventoryDeleteAPIView(generics.DestroyAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

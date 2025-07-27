# inventory/urls.py

from django.urls import path
from .views import InventoryListCreateAPIView, InventoryDeleteAPIView

urlpatterns = [
    path('inventory/', InventoryListCreateAPIView.as_view()),
    path('inventory/<int:pk>/', InventoryDeleteAPIView.as_view()),
]

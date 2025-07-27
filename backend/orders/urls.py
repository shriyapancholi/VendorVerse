from django.urls import path # type: ignore
from .views import OrderCreateView

urlpatterns = [
    path('create/', OrderCreateView.as_view(), name='create-order'),
]

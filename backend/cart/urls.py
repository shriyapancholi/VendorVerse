from django.urls import path # type: ignore
from .views import AddToCartView, CartDetailView, CartItemCountView, RemoveFromCartView

urlpatterns = [
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('', CartDetailView.as_view(), name='cart-detail'),
    path('item-count/', CartItemCountView.as_view(), name='cart-item-count'),
    path('items/<int:item_id>/delete/', RemoveFromCartView.as_view(), name='remove-from-cart'),
]
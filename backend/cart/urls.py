from django.urls import path # type: ignore
from .views import AddToCartView, CartDetailView, CartItemCountView,RemoveFromCartView

urlpatterns = [
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    # This will be the main endpoint for viewing the cart
    path('', CartDetailView.as_view(), name='cart-detail'),
    # This is a specific endpoint for getting just the count
    path('item-count/', CartItemCountView.as_view(), name='cart-item-count'),
    path('items/<int:item_id>/delete/', RemoveFromCartView.as_view(), name='remove-from-cart'),
]

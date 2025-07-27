# cart/serializers.py
from rest_framework import serializers # type: ignore
from .models import Cart, CartItem
class CartItemSerializer(serializers.ModelSerializer):
    # These two lines are crucial. They fetch the names from the related models.
    product_name = serializers.CharField(source='product.name', read_only=True)
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'supplier', 'quantity', 'price', 'product_name', 'supplier_name']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']

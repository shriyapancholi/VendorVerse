from rest_framework import serializers # type: ignore
from .models import Category, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # --- ADD 'offer' and 'is_deal_of_the_day' ---
        fields = ['id', 'name', 'image', 'offer', 'is_deal_of_the_day']

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'products']

# products/serializers.py

from rest_framework import serializers # type: ignore
from .models import Category, Product, SupplierProductPrice
from suppliers.serializers import SupplierSerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'offer', 'is_deal_of_the_day']

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'products']

# --- This serializer is for the "through" model ---
class SupplierProductPriceSerializer(serializers.ModelSerializer):
    # This will nest the full supplier details
    supplier = SupplierSerializer(read_only=True)

    class Meta:
        model = SupplierProductPrice
        fields = ['supplier', 'price', 'unit']


# --- This is the missing serializer that needs to be added ---
class ProductDetailSerializer(serializers.ModelSerializer):
    # 'supplierproductprice_set' is the reverse relationship from Product 
    # to the SupplierProductPrice model.
    suppliers = SupplierProductPriceSerializer(source='supplierproductprice_set', many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'suppliers']

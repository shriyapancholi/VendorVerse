# products/views.py

import requests # type: ignore
from django.conf import settings # type: ignore
from rest_framework import generics # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductDetailSerializer
from suppliers.serializers import SupplierSerializer

class CategoryProductListView(generics.ListAPIView):
    """
    API view to list all categories along with their nested products.
    """
    queryset = Category.objects.prefetch_related('products').all()
    serializer_class = CategorySerializer

class DealOfTheDayListView(generics.ListAPIView):
    """
    API view to list all products that are marked as a "Deal of the Day".
    """
    queryset = Product.objects.filter(is_deal_of_the_day=True)
    serializer_class = ProductSerializer

class ProductSuppliersView(APIView):
    """
    API view to get all suppliers for a specific product.
    """
    def get(self, request, product_id):
        try:
            product = Product.objects.get(pk=product_id)
            suppliers = product.suppliers.all()
            serializer = SupplierSerializer(suppliers, many=True)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

class ProductDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve all details for a single product.
    This view now includes dynamic pricing logic based on weather from weatherapi.com.
    """
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'pk'

    def retrieve(self, request, *args, **kwargs):
        # 1. Get the base product data from the database
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # 2. Fetch current weather data for Ahmedabad using WeatherAPI.com
        weather_condition_text = None
        try:
            api_key = settings.WEATHER_API_KEY
            # The URL structure for weatherapi.com is different
            weather_url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q=Ahmedabad"
            weather_response = requests.get(weather_url).json()
            
            # The response structure is different. We get the condition text.
            if 'current' in weather_response:
                weather_condition_text = weather_response['current']['condition']['text']
        except Exception as e:
            print(f"Weather API call failed: {e}")
            # If the API fails, we'll proceed without dynamic pricing

        # 3. Apply dynamic pricing rules based on the condition text
        for supplier_offering in data['suppliers']:
            base_price = float(supplier_offering['price'])
            
            # Example Rule 1: If the weather text contains "rain", increase vegetable prices by 12%
            if weather_condition_text and 'rain' in weather_condition_text.lower() and instance.category.name == 'Vegetables':
                base_price *= 1.12
            
            # Example Rule 2: If the weather is "Sunny" or "Clear", decrease fruit prices by 7%
            if weather_condition_text and (weather_condition_text.lower() == 'sunny' or weather_condition_text.lower() == 'clear') and instance.category.name == 'Fruits':
                base_price *= 0.93

            # Update the price in the data that will be sent to the frontend
            supplier_offering['price'] = f"{base_price:.2f}"

        # 4. Return the modified data with the dynamic prices
        return Response(data)

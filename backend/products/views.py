from rest_framework import generics # type: ignore
from rest_framework.views import APIView  # type: ignore # Import APIView here
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
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

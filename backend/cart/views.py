from rest_framework import status, permissions # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from .models import Cart, CartItem
from .serializers import CartSerializer
from products.models import Product
from suppliers.models import Supplier

class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        supplier_id = request.data.get('supplier_id')
        quantity = int(request.data.get('quantity', 1))
        price = request.data.get('price')

        if not all([product_id, supplier_id, price]):
            return Response({"error": "Missing product, supplier, or price."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
            supplier = Supplier.objects.get(id=supplier_id)
        except (Product.DoesNotExist, Supplier.DoesNotExist):
            return Response({"error": "Invalid product or supplier ID."}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            supplier=supplier,
            defaults={'quantity': quantity, 'price': price}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response({"message": "Item added to cart successfully."}, status=status.HTTP_200_OK)

class CartDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartItemCountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            item_count = sum(item.quantity for item in cart.items.all())
        except Cart.DoesNotExist:
            item_count = 0
        return Response({'item_count': item_count}, status=status.HTTP_200_OK)

class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        try:
            # Find the specific item in the user's cart and delete it.
            # This is secure because it checks that the item belongs to the logged-in user's cart.
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
            cart_item.delete()
            # 204 No Content is the standard successful response for a DELETE request.
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in your cart."}, status=status.HTTP_404_NOT_FOUND)

from rest_framework import status, permissions # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from .serializers import OrderCreateSerializer
from .models import Order, OrderItem
from cart.models import Cart

class OrderCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                cart = Cart.objects.get(user=request.user)
                cart_items = cart.items.all()

                if not cart_items.exists():
                    return Response({"error": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

                # Calculate total price from cart items
                total_price = sum(item.price * item.quantity for item in cart_items)
                
                # Create the order
                order = serializer.save(user=request.user, total_price=total_price)

                # Create order items from cart items
                for item in cart_items:
                    OrderItem.objects.create(
                        order=order,
                        product=item.product,
                        supplier=item.supplier,
                        quantity=item.quantity,
                        price=item.price
                    )
                
                # Clear the cart
                cart_items.delete()

                return Response({"success": "Order placed successfully!", "order_id": order.id}, status=status.HTTP_201_CREATED)

            except Cart.DoesNotExist:
                return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

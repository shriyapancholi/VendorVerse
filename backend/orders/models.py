from django.db import models # type: ignore
from django.conf import settings # type: ignore
from products.models import Product
from suppliers.models import Supplier

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    payment_method = models.CharField(max_length=50, default='Cash on Delivery')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    is_placed = models.BooleanField(default=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT) # Protect product from being deleted if in an order
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2) # Price at the time of order

    def __str__(self):
        return f"{self.quantity} x {self.product.name} for Order {self.order.id}"

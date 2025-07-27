from django.db import models # type: ignore
from suppliers.models import Supplier # Import the Supplier model

class Category(models.Model):
    # ... (no changes here)
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class Product(models.Model):
    # ... (no changes to existing fields)
    name = models.CharField(max_length=200)
    image = models.URLField(max_length=500)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    offer = models.CharField(max_length=50, blank=True, null=True)
    is_deal_of_the_day = models.BooleanField(default=False)
    
    # --- ADD THIS MANY-TO-MANY FIELD ---
    suppliers = models.ManyToManyField(Supplier, through='SupplierProductPrice', related_name='products')

    def __str__(self):
        return self.name
    
class SupplierProductPrice(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=50, help_text="e.g., per kg, per piece")

    class Meta:
        # Ensures that each supplier can only have one price for a specific product
        unique_together = ('product', 'supplier')

    def __str__(self):
        return f"{self.supplier.name} - {self.product.name}: ₹{self.price}"

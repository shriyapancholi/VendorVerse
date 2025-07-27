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
    suppliers = models.ManyToManyField(Supplier, related_name='products')

    def __str__(self):
        return self.name
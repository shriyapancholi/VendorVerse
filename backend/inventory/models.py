from django.db import models

# Create your models here.
# inventory/models.py

from django.db import models

class InventoryItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)              # New
    quantity = models.CharField(max_length=50)
    unit = models.CharField(max_length=20, default='kg')    # New
    price = models.CharField(max_length=50)
    barterValue = models.CharField(max_length=100, blank=True)  # New
    quality = models.CharField(max_length=100, blank=True)
    expiry = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='In Stock')  # New
    isLowStock = models.BooleanField(default=False)         # ← from surplus

    def __str__(self):
        return f"{self.name} - {self.quantity} {self.unit}"
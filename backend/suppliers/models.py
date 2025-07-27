from django.db import models # type: ignore

class Supplier(models.Model):
    name = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.5)
    delivery_time = models.CharField(max_length=50, default="30-45 mins")
    image = models.URLField(max_length=500, blank=True)

    

    def __str__(self):
        return self.name

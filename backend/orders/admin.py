from django.contrib import admin # type: ignore
from .models import Order, OrderItem

# Register your models here.
admin.site.register(Order)
admin.site.register(OrderItem)
from django.contrib import admin # type: ignore
from .models import Cart, CartItem

# Register your models here.
admin.site.register(Cart)
admin.site.register(CartItem)
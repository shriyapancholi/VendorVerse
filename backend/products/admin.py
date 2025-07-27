# products/admin.py

from django.contrib import admin # type: ignore
from .models import Category, Product

# This custom admin view makes managing products much easier
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_deal_of_the_day', 'offer')
    list_filter = ('category', 'is_deal_of_the_day')
    list_editable = ('is_deal_of_the_day', 'offer')
    search_fields = ('name',)

admin.site.register(Category)
admin.site.register(Product, ProductAdmin)

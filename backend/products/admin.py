from django.contrib import admin # type: ignore
from .models import Category, Product, SupplierProductPrice

# This allows you to add supplier prices directly on the Product admin page
class SupplierProductPriceInline(admin.TabularInline):
    model = SupplierProductPrice
    extra = 1 # Show one extra blank form by default

class ProductAdmin(admin.ModelAdmin):
    inlines = (SupplierProductPriceInline,)
    list_display = ('name', 'category')
    list_filter = ('category',)

admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
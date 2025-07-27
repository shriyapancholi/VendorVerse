from django.contrib import admin # type: ignore
from .models import Category, Product, SupplierProductPrice

# This allows you to add supplier prices directly on the Product admin page
class SupplierProductPriceInline(admin.TabularInline):
    model = SupplierProductPrice
    extra = 1 # Show one extra blank form by default

class ProductAdmin(admin.ModelAdmin):
    inlines = (SupplierProductPriceInline,)
    # MODIFIED: Added 'is_deal_of_the_day' for better visibility in the list
    list_display = ('name', 'category', 'is_deal_of_the_day')
    list_filter = ('category', 'is_deal_of_the_day')
    # MODIFIED: Added a search bar to search by product name or category
    search_fields = ('name', 'category__name')
    # MODIFIED: This allows you to toggle the 'deal of the day' flag
    # directly from the product list page without editing the whole product.
    list_editable = ('is_deal_of_the_day',)

admin.site.register(Category)
admin.site.register(Product, ProductAdmin)

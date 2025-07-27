# products/urls.py

from django.urls import path # type: ignore
from .views import CategoryProductListView
from .views import DealOfTheDayListView
from .views import ProductSuppliersView

urlpatterns = [
    path('categories/', CategoryProductListView.as_view(), name='category-product-list'),
     path('deals/', DealOfTheDayListView.as_view(), name='deal-of-the-day-list'), # type: ignore
     path('products/<int:product_id>/suppliers/', ProductSuppliersView.as_view(), name='product-suppliers'),
]

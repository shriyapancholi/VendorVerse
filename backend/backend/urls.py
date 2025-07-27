from django.contrib import admin # type: ignore
from django.urls import path, include # type: ignore # Make sure 'include' is imported

urlpatterns = [
    path('admin/', admin.site.urls),
    # Add this line to include your new authentication endpoints
    path('api/users/', include('users.urls')),
    # ... any other urls you already have
    path('api/', include('products.urls')), # Add this line
    path('api/cart/', include('cart.urls')),
     
]   
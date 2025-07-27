from rest_framework import serializers # type: ignore
from .models import Supplier

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'rating', 'delivery_time', 'image']
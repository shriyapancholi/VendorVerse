from rest_framework import serializers # type: ignore
from .models import Order

class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['address', 'phone_number', 'payment_method']

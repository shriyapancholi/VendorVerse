from rest_framework import serializers
from .models import InventoryItem

class InventoryItemSerializer(serializers.ModelSerializer):
    surplus = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = InventoryItem
        fields = [
            "id",
            "name",
            "description",
            "quantity",
            "unit",
            "price",
            "barterValue",
            "quality",
            "expiry",
            "category",
            "status",
            "isLowStock",
            "surplus",  # Accept from frontend, map to isLowStock
        ]

    def create(self, validated_data):
        # Extract and map `surplus` → `isLowStock`
        is_low = validated_data.pop("surplus", False)
        validated_data["isLowStock"] = is_low
        return super().create(validated_data)

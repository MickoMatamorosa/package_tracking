from rest_framework import serializers
from packages.models import Package, PackageStatus


# Package Serializer
class PackageSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False, read_only=True
    )
    branch_name = serializers.SerializerMethodField("get_branch_name")

    class Meta:
        model = Package
        fields = "__all__"
        ordering = ["timestamp"]

    def get_branch_name(self, value):
        return {
            "sender": value.from_branch.branch.name,
            "receiver": value.to_branch.name,
        }


# Package Status Serializer
class PackageStatusSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False, read_only=True
    )
    description = serializers.SerializerMethodField("get_description")

    class Meta:
        model = PackageStatus
        fields = "__all__"

    def get_description(self, value):
        return value.status.description

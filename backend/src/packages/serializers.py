from rest_framework import serializers
from packages.models import Package, PackageStatus

# Package Serializer  
class PackageSerializer(serializers.ModelSerializer):
  timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

  class Meta:
    model = Package
    fields = '__all__'


# Package Status Serializer  
class PackageStatusSerializer(serializers.ModelSerializer):
  class Meta:
    model = PackageStatus
    fields = ('remarks', 'timestamp')
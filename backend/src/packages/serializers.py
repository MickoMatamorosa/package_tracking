from rest_framework import serializers
from packages.models import Package, PackageStatus

# Package Serializer  
class PackageSerializer(serializers.ModelSerializer):

  class Meta:
    model = Package
    fields = ('tracking_number', 'timestamp')


# Package Status Serializer  
class PackageStatusSerializer(serializers.ModelSerializer):
  class Meta:
    model = PackageStatus
    fields = ('remarks', 'timestamp')
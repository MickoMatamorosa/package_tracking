from rest_framework import serializers
from packages.models import Package, PackageStatus
from django.db import models

# Package Serializer  
class PackageSerializer(serializers.ModelSerializer):
  timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

  class Meta:
    model = Package
    fields = '__all__'


# Package Status Serializer  
class PackageStatusSerializer(serializers.ModelSerializer):
  timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
  
  class Meta:
    model = PackageStatus
    fields = '__all__'
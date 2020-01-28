from rest_framework import serializers
from branches.models import Branch, StatusFlow

# Branch Serializer
class BranchSerializer(serializers.ModelSerializer):
  id = serializers.ReadOnlyField()
  class Meta:
    model = Branch
    fields = '__all__'
    read_only_fields = ['id']


# Status Flow Serializer
class StatusFlowSerializer(serializers.ModelSerializer):
  class Meta:
    model = StatusFlow
    fields = ('queue', 'branch_type', 'description')
    ordering = ['queue']



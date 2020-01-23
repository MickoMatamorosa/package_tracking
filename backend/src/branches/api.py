from rest_framework import viewsets, permissions
from .serializers import BranchSerializer
from .models import Branch
from packages.serializers import PackageSerializer
from packages.models import Package


# user's branch viewset
class BranchViewSet(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        return [self.request.user.branch]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
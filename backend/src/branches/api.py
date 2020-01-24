from rest_framework import viewsets, permissions
from .serializers import BranchSerializer, StatusFlowSerializer
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


# user's branch status flow viewset
class StatusFlowViewSet(viewsets.ModelViewSet):
    serializer_class = StatusFlowSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        print(dir(self.request.user.branch))
        return []

    def perform_create(self, serializer):
        serializer.save(branch=self.request.user.branch)
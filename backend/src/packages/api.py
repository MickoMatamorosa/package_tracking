from packages.models import Package
from rest_framework import viewsets, permissions, generics, filters
from .serializers import PackageSerializer
from branches.serializers import StatusFlowSerializer
from django_filters.rest_framework import DjangoFilterBackend

# public package view
class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Package.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = PackageSerializer


# user packages viewset (sending, receiving, sent)
class UserPackageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = PackageSerializer

    def get_queryset(self):
        queryset = []
        user = self.request.user
        packages = Package.objects.filter
        queryset.extend(packages(from_branch=user).values())
        queryset.extend(packages(to_branch=user.branch).values())
        return queryset

    def perform_create(self, serializer):
        serializer.save(from_branch=self.request.user)
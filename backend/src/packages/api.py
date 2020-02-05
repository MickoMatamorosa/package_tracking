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
        _queryset = []
        user = self.request.user
        packages = Package.objects.filter
        package_sent = packages(from_branch=user.id)
        package_receive = packages(to_branch=user.branch)
        package_type = self.request.query_params.get('type', None)
        if package_type == 'sending':
            _queryset.extend(package_sent)
        elif package_type == 'receiving':
            _queryset.extend(package_receive)
        elif package_type == 'completed':
            completed_packages = Package.objects.filter(completed=True).filter
            _queryset.extend(completed_packages(from_branch=user.id))
            _queryset.extend(completed_packages(to_branch=user.branch))
        else:
            _queryset.extend(package_sent)
            _queryset.extend(package_receive)

        trace = self.request.query_params.get('trace', None)

        if trace:
            _queryset = packages(tracking_number=trace)
        print(_queryset)
        return _queryset

    def perform_create(self, serializer):
        serializer.save(from_branch=self.request.user)

# user packages viewset (sending, receiving, sent)
class UserPackageSentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = PackageSerializer

    def get_queryset(self):
        _queryset = []
        user = self.request.user
        packages = Package.objects.filter
        _queryset.extend(packages(from_branch=user).values())
        _queryset.extend(packages(to_branch=user.branch).values())
        return _queryset

    def perform_create(self, serializer):
        serializer.save(from_branch=self.request.user)
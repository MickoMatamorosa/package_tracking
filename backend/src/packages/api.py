from branches.models import Branch, StatusFlow
from packages.models import Package, PackageStatus
from rest_framework import viewsets, permissions, generics, filters
from .serializers import PackageSerializer, PackageStatusSerializer
from branches.serializers import StatusFlowSerializer
from django_filters.rest_framework import DjangoFilterBackend

# user packages viewset (sending, receiving, sent)
class UserPackageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = PackageSerializer
    
    def get_queryset(self):
        _response = []
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

        # request tracking
        trace = self.request.query_params.get('trace', None)
        if trace:
            _queryset = packages(tracking_number=trace)

        # set other branch name
        for x in _queryset:
            if user == x.from_branch:
                x.branch_name = x.to_branch.name
            else:
                x.branch_name = x.from_branch.branch.name
            _response.append(x)
        return _response

    def perform_create(self, serializer):
        serializer.save(from_branch=self.request.user)


class PackageStatusViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = PackageStatusSerializer

    def get_queryset(self):
        package = self.request.query_params.get('package', None)
        return PackageStatus.objects.filter(package=package)


# public package status
class PackageStatusGuestViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny,]
    serializer_class = PackageStatusSerializer

    def get_queryset(self):
        trace = self.request.query_params.get('trace', None)
        package = Package.objects.get(tracking_number=trace)
        return package.packagestatus_set.all()


# public status view
class PackageStatusDetailsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny,]
    serializer_class = StatusFlowSerializer

    def get_queryset(self):
        trace = self.request.query_params.get('trace', None)
        package = Package.objects.get(tracking_number=trace)
        return [
            *package.from_branch.branch.statusflow_set.filter(branch_type="sending"),
            *package.to_branch.statusflow_set.filter(branch_type="receiving")
        ]
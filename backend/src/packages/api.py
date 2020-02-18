from branches.models import Branch, StatusFlow
from packages.models import Package, PackageStatus
from rest_framework import viewsets, permissions, generics, filters
from .serializers import PackageSerializer, PackageStatusSerializer
from branches.serializers import StatusFlowSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status,viewsets
from rest_framework.response import Response
from django.http import Http404


# user packages viewset (sending, receiving, sent)
class UserPackageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = PackageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['completed', 'cancel', 'tracking_number']
    
    def get_queryset(self):
        user = self.request.user
        packages = Package.objects.filter
        package_sent = packages(from_branch=user.id)
        package_receive = packages(to_branch=user.branch)
        from_branch = self.request.query_params.get('from_branch', None)
        to_branch = self.request.query_params.get('to_branch', None)
        
        if from_branch:
            return package_sent
        
        if to_branch:
            return package_receive

        return package_sent | package_receive

    def perform_create(self, serializer):
        serializer.save(from_branch=self.request.user)

    def update(self, request, *args, **kwargs):
        auth = self.request.user
        instance = self.get_object()
        if auth == instance.from_branch:
            partial = kwargs.pop('partial', False)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)        



class PackageStatusViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = PackageStatusSerializer

    def get_queryset(self):
        package = self.request.query_params.get('package', None)
        return PackageStatus.objects.filter(package=package)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status.queue > 1:
            self.perform_destroy(instance)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


# public package status
class PackageStatusGuestViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny,]
    serializer_class = PackageStatusSerializer

    def get_queryset(self):
        print(self.kwargs['trace'])
        package = Package.objects.get(tracking_number=self.kwargs['trace'])
        return package.packagestatus_set.all()
            
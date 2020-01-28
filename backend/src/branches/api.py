from rest_framework import viewsets, permissions
from .serializers import BranchSerializer, StatusFlowSerializer
from .models import Branch, StatusFlow
from packages.serializers import PackageSerializer
from packages.models import Package
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from accounts.api import UserAPI

# user's branch viewset
class BranchViewSet(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated,]
    queryset = Branch.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # check user id and branch user id
        # condition here
        serializer.save()


class UserBranchViewSet(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated,]
    queryset = Branch.objects.all()
    
    def get_queryset(self):
        return [self.request.user.branch]


# user's branch status flow viewset
class StatusFlowViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = StatusFlowSerializer

    def get_queryset(self):
        branch = self.request.user.branch
        return StatusFlow.objects.filter(branch=branch)

    def perform_create(self, serializer):
        queue_no = 1
        stype = self.request._data['branch_type']
        last_queue = self.get_queryset().filter(branch_type=stype).last()
        
        if last_queue:
            queue_no += last_queue.queue

        serializer.save(
            branch = self.request.user.branch,
            queue = queue_no
        )
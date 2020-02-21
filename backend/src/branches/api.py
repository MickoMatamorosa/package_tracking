from rest_framework import viewsets, permissions
from .serializers import BranchSerializer, StatusFlowSerializer
from .models import Branch, StatusFlow
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.response import Response


# user's branch viewset
class BranchViewSet(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Branch.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# other branch viewset
class OtherBranchViewSet(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Branch.objects.filter(~Q(user=user))


# user's branch status flow viewset
class StatusFlowViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StatusFlowSerializer

    def get_queryset(self):
        """ Getting the sender or receiver branch
            fetch the status flow base on branch_type
        """
        branch = self.request.query_params.get("branch", None)
        flow_type = self.request.query_params.get("branch_type", None)
        if flow_type == "sending":
            _queryset = User.objects.get(id=branch).branch
        elif flow_type == "receiving":
            _queryset = Branch.objects.get(id=branch)
        else:
            return StatusFlow.objects.filter(branch=self.request.user.branch)
        return _queryset.statusflow_set.filter(branch_type=flow_type)

    def perform_create(self, serializer):
        """ Automate queuing on create"""
        queue_no = 1
        stype = self.request._data["branch_type"].lower()
        last_queue = StatusFlow.objects.filter(
            branch=self.request.user.branch, branch_type=stype
        ).first()

        if last_queue:
            queue_no += last_queue.queue

        serializer.save(
            branch=self.request.user.branch, branch_type=stype, queue=queue_no
        )

    def adjust_status_flow(self, id, num):
        stat_flow = StatusFlow.objects.get(id=id)
        stat_flow.queue += num
        stat_flow.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        from_queue = instance.queue
        to_queue = int(request.data["queue"])

        status_flow_list = (
            StatusFlow.objects.filter(branch=instance.branch)
            .exclude(queue=instance.queue)
            .order_by("queue")
        )

        # adjust queuing
        if instance.branch_type != request.data["branch_type"]:
            for sf in status_flow_list:
                if sf.queue > from_queue and sf.branch_type == instance.branch_type:
                    # decrease queue value
                    self.adjust_status_flow(sf.id, -1)
                elif (
                    sf.queue >= to_queue
                    and sf.branch_type == request.data["branch_type"]
                ):
                    self.adjust_status_flow(sf.id, 1)
        else:
            if from_queue != to_queue:
                status_flow_list = status_flow_list.filter(
                    branch_type=instance.branch_type
                )

                for sf in status_flow_list:
                    if from_queue < sf.queue <= to_queue:
                        # decrease queue value
                        self.adjust_status_flow(sf.id, -1)
                    elif from_queue > sf.queue >= to_queue:
                        # increase queue value
                        self.adjust_status_flow(sf.id, 1)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

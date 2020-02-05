from rest_framework import routers
from branches.api import BranchViewSet, StatusFlowViewSet, UserBranchViewSet, OtherBranchViewSet

router = routers.DefaultRouter()
router.register(r'^api/branch/statusflow', StatusFlowViewSet, 'status_flow')
router.register(r'^api/branch/others', OtherBranchViewSet, 'other_branch')
router.register(r'^api/auth/branch', UserBranchViewSet, 'user_branch')
router.register(r'^api/branch', BranchViewSet, 'branches')

urlpatterns = router.urls
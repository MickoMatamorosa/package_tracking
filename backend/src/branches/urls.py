from rest_framework import routers
from branches.api import BranchViewSet, StatusFlowViewSet

router = routers.SimpleRouter()
router.register(r'api/branch/statusflow', StatusFlowViewSet, 'status_flow')
router.register(r'api/branch', BranchViewSet, 'branches')

urlpatterns = router.urls
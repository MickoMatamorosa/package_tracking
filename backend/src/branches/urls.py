from rest_framework import routers
from branches.api import BranchViewSet, StatusFlowViewSet

router = routers.SimpleRouter()
router.register(r'api/branch', BranchViewSet, 'branches')
router.register(r'api/branch/status-flow', StatusFlowViewSet, 'status-flow')

urlpatterns = router.urls
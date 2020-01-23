from rest_framework import routers
from branches.api import BranchViewSet

router = routers.SimpleRouter()
router.register(r'api/branch', BranchViewSet, 'branches')

urlpatterns = router.urls
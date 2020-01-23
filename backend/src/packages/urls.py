from rest_framework import routers
from packages.api import PackageViewSet, UserPackageViewSet

router = routers.SimpleRouter()
router.register('api/package', PackageViewSet, 'package')
router.register('api/user/package', UserPackageViewSet, 'user-packages')

urlpatterns = router.urls
from rest_framework import routers
from packages import api

router = routers.SimpleRouter()
router.register('api/guest/package/status/remarks', api.PackageStatusDetailsViewSet, 'package-status-desc')
router.register('api/guest/package/status', api.PackageStatusGuestViewSet, 'guest-package')
router.register('api/package/status', api.PackageStatusViewSet, 'package-status')
router.register('api/package', api.PackageViewSet, 'package')
router.register('api/user/package', api.UserPackageViewSet, 'user-packages')

urlpatterns = router.urls
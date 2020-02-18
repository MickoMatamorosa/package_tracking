from rest_framework import routers
from packages import api

router = routers.SimpleRouter()
router.register(r'^api/guest/package/(?P<trace>\d+)', api.PackageStatusGuestViewSet, 'guest-package')
router.register(r'api/package/status', api.PackageStatusViewSet, 'package-status')
router.register(r'api/user/package', api.UserPackageViewSet, 'user-packages')

urlpatterns = router.urls
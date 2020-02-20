from rest_framework import routers
from packages import api

router = routers.SimpleRouter()
router.register(r"^api/guest/package/(?P<trace>\d+)", api.PackageStatusGuestViewSet)
router.register(r"api/package/status", api.PackageStatusViewSet)
router.register(r"api/user/package", api.UserPackageViewSet)

urlpatterns = router.urls

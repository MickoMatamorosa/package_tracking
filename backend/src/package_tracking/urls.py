from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("", include("accounts.urls")),
    path("", include("branches.urls")),
    path("", include("packages.urls")),
    path("admin/", admin.site.urls),
]

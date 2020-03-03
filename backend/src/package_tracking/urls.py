from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("", include("accounts.urls")),
    path("", include("branches.urls")),
    path("", include("packages.urls")),
    path("administrator/", admin.site.urls),
]

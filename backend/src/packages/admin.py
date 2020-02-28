from django.contrib import admin
from .models import Package, PackageStatus


admin.site.register(Package)
admin.site.register(PackageStatus)

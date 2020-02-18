from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
from branches.models import Branch, StatusFlow

from uuid import uuid4

def make_tracking():
    return uuid4().node

class Package(models.Model):
    client_fullname = models.CharField(max_length=200)
    client_address = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)
    cancel = models.BooleanField(default=False)

    tracking_number = models.CharField(
        max_length=50,
        editable=False,
        default=make_tracking
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    from_branch = models.ForeignKey(User, on_delete=models.CASCADE)

    to_branch = models.ForeignKey(Branch, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['from_branch', 'to_branch', 'tracking_number']

    def __str__(self):
        return '%s (%s)' % (self.tracking_number, self.timestamp)
    
    
    
class PackageStatus(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    status = models.ForeignKey(StatusFlow, on_delete=models.CASCADE)
    remarks = models.CharField(max_length=50, default="ongoing")
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-timestamp']
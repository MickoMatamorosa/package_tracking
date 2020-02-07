from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User


class Branch(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=False)
    address = models.CharField(max_length=500, null=False)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return '%s - %s' % (self.name, self.address)


class StatusFlow(models.Model):
    queue = models.IntegerField(null=True)
    branch_type = models.CharField(max_length=20, null=False)
    description = models.CharField(max_length=500, null=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)

    class Meta:
        ordering = ['branch_type', '-queue']

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PackageStatus, Package
from branches.models import StatusFlow


@receiver(post_save, sender=Package)
def next_status(sender, instance, created, **kwargs):
    if created:
        status = StatusFlow.objects.get(
            queue=1, branch_type="sending", branch=instance.from_branch.branch)
        PackageStatus.objects.create(package=instance, status=status)


@receiver(post_save, sender=PackageStatus)
def next_status(sender, instance, created, **kwargs):
    print(created)
    if instance.remarks == "done":
        try:
            status = StatusFlow.objects.get(
                queue=instance.status.queue + 1,
                branch_type=instance.status.branch_type,
                branch=instance.status.branch
            )
            PackageStatus.objects.create(package=instance.package, status=status)
        except:
            if instance.status.branch_type == "sending":
                status = StatusFlow.objects.get(
                    queue=1, branch_type="receiving",
                    branch=instance.package.to_branch
                )
                PackageStatus.objects.create(package=instance.package, status=status)
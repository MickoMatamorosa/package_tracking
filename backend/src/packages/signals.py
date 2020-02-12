from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import PackageStatus, Package
from branches.models import StatusFlow


@receiver(post_save, sender=Package)
def init_status(sender, instance, created, **kwargs):
    if created:
        status = StatusFlow.objects.get(
            queue=1, branch_type="sending", 
            branch=instance.from_branch.branch
        )
        PackageStatus.objects.create(package=instance, status=status)


@receiver(post_save, sender=PackageStatus)
def next_status(sender, instance, created, **kwargs):
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
            elif instance.status.branch_type == "receiving":
                package = Package.objects.get(pk=instance.package_id)
                package.completed = True
                package.save()

@receiver(post_delete, sender=PackageStatus)
def previous_status(sender, instance, **kwargs):
    if instance.status.queue > 1:
        status = StatusFlow.objects.get(
            queue=instance.status.queue - 1,
            branch_type=instance.status.branch_type,
            branch=instance.status.branch
        )

        package_status = PackageStatus.objects.get(
            package=instance.package, status=status)

        package_status.remarks = "ongoing"
        package_status.save()
        
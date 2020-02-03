# Generated by Django 3.0.2 on 2020-02-03 01:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import packages.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('branches', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_fullname', models.CharField(max_length=200)),
                ('client_address', models.CharField(max_length=500)),
                ('tracking_number', models.CharField(default=packages.models.make_tracking, editable=False, max_length=50)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('from_branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
                ('to_branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='branches.Branch')),
            ],
            options={
                'ordering': ['timestamp'],
                'unique_together': {('from_branch', 'to_branch', 'tracking_number')},
            },
        ),
        migrations.CreateModel(
            name='PackageStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('remarks', models.CharField(max_length=50)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='packages.Package')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='branches.StatusFlow')),
            ],
        ),
    ]

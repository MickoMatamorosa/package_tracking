# Generated by Django 3.0.2 on 2020-02-11 03:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("branches", "0001_initial")]

    operations = [
        migrations.AlterModelOptions(
            name="statusflow", options={"ordering": ["branch_type", "-queue"]}
        )
    ]

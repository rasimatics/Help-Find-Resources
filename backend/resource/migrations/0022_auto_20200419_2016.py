# Generated by Django 3.0.5 on 2020-04-19 16:16

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0021_auto_20200419_2016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='urls',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.URLField(unique=True), size=None),
        ),
    ]

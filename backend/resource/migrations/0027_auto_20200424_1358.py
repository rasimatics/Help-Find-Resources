# Generated by Django 3.0.5 on 2020-04-24 09:58

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0026_auto_20200419_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='title',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), size=None),
        ),
    ]

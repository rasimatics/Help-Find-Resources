# Generated by Django 3.0.5 on 2020-04-26 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0035_auto_20200426_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]

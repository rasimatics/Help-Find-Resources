# Generated by Django 3.0.5 on 2020-04-25 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0031_post_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='url',
            name='confirmed',
            field=models.BooleanField(default=False),
        ),
    ]
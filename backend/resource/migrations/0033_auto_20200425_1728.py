# Generated by Django 3.0.5 on 2020-04-25 13:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0032_url_confirmed'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Post',
            new_name='Resource',
        ),
    ]

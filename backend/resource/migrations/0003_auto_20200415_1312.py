# Generated by Django 2.2.5 on 2020-04-15 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0002_auto_20200415_1201'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='url',
            name='post',
        ),
        migrations.AddField(
            model_name='post',
            name='url',
            field=models.ManyToManyField(to='resource.Url'),
        ),
    ]

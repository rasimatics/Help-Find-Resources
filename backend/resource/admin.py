from django.contrib import admin
from .models import Resource, Url

@admin.register(Resource)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title","urls","description","like","confirmed")

@admin.register(Url)
class UrlAdmin(admin.ModelAdmin):
    list_display = ("url","title","confirmed","post")
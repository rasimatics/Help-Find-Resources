from django.contrib import admin
from freecourses.models import Course, UrlCourse

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("name","url","description","expiry_date","confirmed")

@admin.register(UrlCourse)
class UrlCourseAdmin(admin.ModelAdmin):
    list_display = ("url","title","course")
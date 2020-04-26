from django.urls import path
from .views import  *

urlpatterns = [
    path('create/',createCourse.as_view()),
    path('all/',allCourses.as_view()),
    path('course/<int:id>/', getCourse.as_view()),
    path('search/<slug:search>/', searchCourse.as_view()),
    path('get-title/<int:id>',getTitle.as_view()),
]

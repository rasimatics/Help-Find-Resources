from django.urls import path
from .views import *


urlpatterns = [
    path('posts/', allPosts.as_view()),
    path('posts/<int:post_id>/', getPost.as_view()),
    path('create/', createPost.as_view()),
    path('search/', searchPosts.as_view()),
    path('get-title/<int:post_id>/',getTitle.as_view()),
]

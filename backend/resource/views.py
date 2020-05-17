from django.db.models import Q
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import Resource, Url
from .serializer import UrlSerializer, ResourceSerializer
from rest_framework.views import APIView
from itertools import chain
# Get all posts
class allPosts(APIView):
    def get(self,request):
        posts = Resource.objects.all()
        serializer = ResourceSerializer(posts, many=True)
        return Response(serializer.data)


# Create new post
class createPost(APIView):
    def post(self, request):
        data = JSONParser().parse(self.request)
        serializer = ResourceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get Update Delete
class getPost(APIView):
    @staticmethod
    def get_object(post_id):
        try:
            post = Resource.objects.get(id=post_id)
        except Resource.DoesNotExist:
            post = None
        return post

    def get(self, request, post_id):
        post = self.get_object(post_id)
        serializer = ResourceSerializer(post)
        return Response(serializer.data)

    def put(self, request, post_id):
        post = self.get_object(post_id)
        serializer = ResourceSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id):
        post = self.get_object(post_id)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Get search result
class searchPosts(APIView):
    def get(self,request):
        searchWords = request.GET.get("q").split()
        posts = []
        for word in searchWords:
            postTitle = Resource.objects.filter(title=word)
            postTitle2 = Resource.objects.filter(title__startswith=word)
            postTitle3 = Resource.objects.filter(title__icontains=word)
            postLink = Resource.objects.filter(url__url__icontains=word)
            postLink2 = Resource.objects.filter(url__title__in = word)
            postDesc = Resource.objects.filter(description=word)
            postDesc2 = Resource.objects.filter(description__startswith=word)
            postDesc3 = Resource.objects.filter(description__icontains=word)

            for elem in postTitle:
                posts.append(elem)

            for elem in postLink2:
                posts.append(elem)

            for elem in postDesc:
                posts.append(elem)

            for elem in postTitle2:
                posts.append(elem)

            for elem in postDesc2:
                posts.append(elem)

            for elem in postTitle3:
                posts.append(elem)

            for elem in postDesc3:
                posts.append(elem)

            for elem in postLink:
                posts.append(elem)


        result = []
        for post in posts:
            if(post in result):
                continue
            else:
                result.append(post)

        serializer = ResourceSerializer(result, many=True)
        return Response(serializer.data)


class getTitle(APIView):
    def get(self,request, post_id):
        urls = Url.objects.filter(post_id=post_id)
        serializer = UrlSerializer(urls, many=True)
        return Response(serializer.data)

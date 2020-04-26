from django.db.models import Q
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from freecourses.models import Course, UrlCourse
from freecourses.serializer import CourseSerializer, UrlCourseSerializer


class createCourse(APIView):
    def post(self,request):
        data = JSONParser().parse(request)
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class allCourses(APIView):
    def get(self,request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

#Get Update Delete
class getCourse(APIView):
    def get_object(self,id):
        try :
            course = Course.objects.get(id=id)
        except Course.DoesNotExist:
            course = None
        return course

    def get(self,request,id):
        course = self.get_object(id)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, id):
        course = self.get_object(id)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,id):
        course = self.get_object(id)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Get search result
class searchCourse(APIView):
    def get(self,request,search):
        courses = Course.objects.filter(Q(name__icontains=search) |
                                        Q(url__icontains=search) |
                                        Q(description__icontains=search))
        serializer = CourseSerializer(courses,many=True)
        return Response(serializer.data)

class getTitle(APIView):
    def get(self,request,id):
        urls = UrlCourse.objects.filter(course=id)
        serializer = UrlCourseSerializer(urls, many=True)
        return Response(serializer.data)









from rest_framework.serializers import ModelSerializer
from .models import Course, UrlCourse

class UrlCourseSerializer(ModelSerializer):
    class Meta:
        model = UrlCourse
        fields = "__all__"


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

    def create(self, validated_data):
        record = Course.objects.create(**validated_data)
        new_url = UrlCourse(url=validated_data['url'], course=record, title=[])
        new_url.save()
        return record

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.expiry_date = validated_data['expiry_date']
        url = UrlCourse.objects.get(url=instance.url,course=instance)
        id = url.pk
        url.delete()
        new_url = UrlCourse(id=id,url=validated_data['url'],course=instance)
        new_url.save()
        instance.url = new_url.url
        instance.save()
        return instance

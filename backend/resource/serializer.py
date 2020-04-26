from rest_framework.serializers import ModelSerializer
from .models import Resource,Url

class UrlSerializer(ModelSerializer):
    class Meta:
        model = Url
        fields = "__all__"

class ResourceSerializer(ModelSerializer):
    class Meta:
        model = Resource
        fields = "__all__"

    def create(self, validated_data):
        record = Resource.objects.create(**validated_data)
        record.urls = []
        for url in validated_data['urls']:
            if(Url.objects.filter(url=url,post_id=record.id).exists()):
                continue
            new_url = Url(url=url,post_id=record.pk,title=[])
            new_url.save()
            record.urls.append(new_url)
            record.save()
        return record

    def update(self, instance, validated_data):
        instance.title = validated_data['title']
        instance.confirmed = validated_data['confirmed']
        instance.like = validated_data['like']
        ids = []
        for url in instance.urls:
            url = Url.objects.get(url=url,post_id=instance.pk)
            ids.append(url.pk)
            url.delete()

        instance.urls = []
        k = 0
        for url in validated_data['urls']:
            try:
                id = ids[k]
                new_url = Url(id = id, url = url, post_id=instance.pk)
                k+=1
            except IndexError:
                new_url = Url(url=url,post_id=instance.pk)

            if(Url.objects.filter(url=url,post_id=instance.pk).exists()):
                continue

            new_url.save()
            instance.urls.append(new_url)

        instance.save()
        return instance
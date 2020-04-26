from django.db import models
from django.contrib.postgres.fields import ArrayField
import requests
from bs4 import BeautifulSoup


class Resource(models.Model):
    title = models.CharField(max_length=50)
    urls = ArrayField(models.URLField())
    description = models.TextField(null=True,blank=True)
    confirmed = models.BooleanField(default=False)
    like = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-pk"]

class Url(models.Model):
    url = models.URLField()
    title = ArrayField(models.TextField(),default=list)
    post = models.ForeignKey(Resource,on_delete=models.CASCADE,null=True)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return  self.url

    def save(self,*args,**kwargs):
        try:
            page = requests.get(self.url)
            soup = BeautifulSoup(page.text, 'html.parser')
            titles = soup.find_all('title')
            for title,i in zip(titles,range(2)):
                self.title.append(title.get_text())

        except requests.ConnectionError:
            self.title = []
        super(Url, self).save(*args, **kwargs)

    class Meta:
        ordering = ["-pk"]


import requests
from bs4 import BeautifulSoup
from django.contrib.postgres.fields import ArrayField
from django.db import models



class Course(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField(default="")
    expiry_date = models.DateField(blank=True,null=True)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
    	ordering = ["-pk"]

class UrlCourse(models.Model):
    url = models.URLField()
    title = ArrayField(models.TextField())
    course = models.ForeignKey(Course,on_delete=models.CASCADE,null=True)

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
        super(UrlCourse, self).save(*args, **kwargs)

    class Meta:
    	ordering = ["-pk"]




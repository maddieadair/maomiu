from django.db import models

# Create your models here.

class CharWord(models.Model):
    traditional = models.CharField(max_length = 20)
    simplified = models.CharField(max_length = 20)    
    english = models.CharField(max_length = 20)
    pinyin = models.CharField(max_length = 20)
    
    class Meta:
        unique_together = ["traditional", "simplified", "english", "pinyin"]

    def __str__(self):
        return self.simplified
    
    def details(self):
        return f"Traditional: {self.traditional}, Simplified: {self.simplified}, Pinyin: {self.pinyin}, English: {self.english}"

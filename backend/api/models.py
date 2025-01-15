from django.db import models
import random

class DataSiswa(models.Model):
    id = models.BigIntegerField( unique=True, blank=True, primary_key=True)
    Nis = models.CharField( unique=True, blank=True, max_length=15)
    Nisn = models.CharField(max_length=15)
    Nama = models.CharField(max_length=40)
    JenisKelamin = models.CharField(max_length=15, null=True, blank=True)
    TanggalLahir = models.DateField(null=True, blank=True)
    TempatLahir = models.CharField(max_length=40, null=True, blank=True)
    Agama = models.CharField(max_length=20, null=True, blank=True)
    Alamat = models.TextField(null=True, blank=True)
    NoTelepon = models.CharField(max_length=18, null=True, blank=True)
    Jurusan = models.CharField(max_length=30)
    Kelas = models.CharField(max_length=3)
    Tanggal_Masuk = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.id: 
            self.id = int(self.Nis)  
        super().save(*args, **kwargs)

class Akademik(models.Model):
    id = models.BigIntegerField( unique=True, blank=True, primary_key=True)
    Nip = models.CharField( unique=True, blank=True, max_length=15)
    Nuptk = models.CharField(max_length=15)
    Nama = models.CharField(max_length=50)
    JenisKelamin = models.CharField(max_length=15, null=True, blank=True)
    TanggalLahir = models.DateField(null=True, blank=True)
    TempatLahir = models.CharField(max_length=40, null=True, blank=True)
    Agama = models.CharField(max_length=20, null=True, blank=True)
    Alamat = models.TextField(null=True, blank=True)
    NoTelepon = models.CharField(max_length=18, null=True, blank=True)
    Posisi = models.CharField(max_length=20)
    Kelas = models.CharField(max_length=20)
    Materi = models.JSONField(default=list, blank=True, null=True)
    Tanggal_Masuk = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = int(self.Nip) if self.Nip else int(self.Nuptk)
        super().save(*args, **kwargs)

class ChatBot(models.Model):
    id = models.BigIntegerField(primary_key=True,)
    Question = models.JSONField()

    def __str__(self):
        return str(self.Question)
    
    def save (self, *args, **kwargs):
        if not self.id:  
            while True:
                new_id = random.randint(10000000, 99999999)
                if not ChatBot.objects.filter(id=new_id).exists():
                    self.id = new_id
                    break
        super().save(*args, **kwargs)

class CacheChatBot(models.Model):
    id = models.BigIntegerField(  primary_key=True)
    User = models.CharField(max_length=50)
    Question = models.JSONField()


    def save(self, *args, **kwargs):
        if not self.id:  
            while True:
                new_id = random.randint(10000000, 99999999)
                if not CacheChatBot.objects.filter(id=new_id).exists():
                    self.id = new_id
                    break
        super().save(*args, **kwargs)

class test(models.Model):
    id = models.BigIntegerField(  primary_key=True)
    question = models.JSONField()

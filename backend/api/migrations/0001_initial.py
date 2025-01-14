# Generated by Django 5.1.4 on 2025-01-06 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Akademik',
            fields=[
                ('id', models.BigIntegerField(blank=True, primary_key=True, serialize=False, unique=True)),
                ('Nip', models.CharField(blank=True, max_length=15, unique=True)),
                ('Nuptk', models.CharField(max_length=15)),
                ('Nama', models.CharField(max_length=50)),
                ('JenisKelamin', models.CharField(blank=True, max_length=15, null=True)),
                ('TanggalLahir', models.DateField(blank=True, null=True)),
                ('TempatLahir', models.CharField(blank=True, max_length=40, null=True)),
                ('Agama', models.CharField(blank=True, max_length=20, null=True)),
                ('Alamat', models.TextField(blank=True, null=True)),
                ('NoTelepon', models.CharField(blank=True, max_length=18, null=True)),
                ('Posisi', models.CharField(max_length=20)),
                ('Kelas', models.CharField(max_length=20)),
                ('Materi', models.JSONField()),
                ('Tanggal_Masuk', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CacheChatBot',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('User', models.CharField(max_length=50)),
                ('question', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='ChatBot',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('question', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='DataSiswa',
            fields=[
                ('id', models.BigIntegerField(blank=True, primary_key=True, serialize=False, unique=True)),
                ('Nis', models.CharField(blank=True, max_length=15, unique=True)),
                ('Nisn', models.CharField(max_length=15)),
                ('Nama', models.CharField(max_length=40)),
                ('JenisKelamin', models.CharField(blank=True, max_length=15, null=True)),
                ('TanggalLahir', models.DateField(blank=True, null=True)),
                ('TempatLahir', models.CharField(blank=True, max_length=40, null=True)),
                ('Agama', models.CharField(blank=True, max_length=20, null=True)),
                ('Alamat', models.TextField(blank=True, null=True)),
                ('NoTelepon', models.CharField(blank=True, max_length=18, null=True)),
                ('Jurusan', models.CharField(max_length=30)),
                ('Kelas', models.CharField(max_length=3)),
                ('Tanggal_Masuk', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='test',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('question', models.JSONField()),
            ],
        ),
    ]

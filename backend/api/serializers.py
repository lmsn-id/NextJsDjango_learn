from django.contrib.auth.models import User
from rest_framework import serializers
from .models import DataSiswa, Akademik, ChatBot
import json

class AkunSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name']
        extra_kwargs = {'password': {'write_only': True}}

class DataSiswaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSiswa
        fields = ['Nis', 'Nama', 'Kelas', 'Jurusan']
        extra_kwargs = {
            'Nis': {'required': True},
            'Nama': {'required': True},
            'Jurusan': {'required': True},
            'Kelas': {'required': True},
            'Nisn': {'allow_null': True, 'required': False},
            'JenisKelamin': {'allow_null': True, 'required': False},
            'TanggalLahir': {'allow_null': True, 'required': False},
            'TempatLahir': {'allow_null': True, 'required': False},
            'Agama': {'allow_null': True, 'required': False},
            'Alamat': {'allow_null': True, 'required': False},
            'NoTelepon': {'allow_null': True, 'required': False},
        }

class GetAllDataSiswaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSiswa
        fields = '__all__'
        

class AkademikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Akademik
        fields = ['id', 'Nip', 'Nuptk', 'Nama', 'Posisi', 'Kelas', 'Materi']
        extra_kwargs = {
            'id': {'read_only': True},
            'Nip': {'required': False, 'allow_blank': True},
            'Nuptk': {'required': False, 'allow_blank': True},
            'Nama': {'required': True},
            'Posisi': {'required': True},
            'Kelas': {'required': False, 'allow_blank': True},
            'Materi': {'required': False, 'allow_null': True},
        }

    def validate(self, data):
        nip = data.get('Nip')
        nuptk = data.get('Nuptk')
        posisi = data.get('Posisi')
        materi = data.get('Materi')

        # Validasi NIP atau NUPTK
        if not nip and not nuptk:
            raise serializers.ValidationError("Salah satu dari Nip atau Nuptk harus diisi.")

        # Validasi posisi "Guru"
        if posisi == "Guru":
            if not materi or not isinstance(materi, list):
                raise serializers.ValidationError("Materi harus berupa daftar objek dengan value dan kelasMateri.")
            for item in materi:
                if not isinstance(item, dict) or 'value' not in item or 'kelasMateri' not in item:
                    raise serializers.ValidationError(
                        "Setiap item Materi harus memiliki key 'value' dan 'kelasMateri'."
                    )
                if not isinstance(item['kelasMateri'], list):
                    raise serializers.ValidationError("kelasMateri harus berupa daftar.")
        else:
            data['Materi'] = []
            data['Kelas'] = ""

        return data



class GetAllAkademikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Akademik
        fields = '__all__'

class ChatBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatBot
        fields = ["Question"]

class GetAllChatBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatBot
        fields = '__all__'

  
from django.conf import settings
from django.contrib.auth.hashers import make_password
from .models import DataSiswa, Akademik, ChatBot, CacheChatBot
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from datetime import datetime
from .serializers import AkunSerializer, DataSiswaSerializer, GetAllDataSiswaSerializer, AkademikSerializer, GetAllAkademikSerializer, ChatBotSerializer, GetAllChatBotSerializer
import traceback
from rest_framework.permissions import IsAuthenticated
import requests
from openai import OpenAI
import google.generativeai as genai
import logging

logger = logging.getLogger(__name__)
genai.configure(api_key=settings.GEMINI_API_KEY)



#=================================================Login=================================================
class LoginViewAdmin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)

            if user.is_superuser:
                request.session['last_login_date'] = datetime.now().date().isoformat()

                return Response({
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'is_superuser': user.is_superuser,
                    'message': "Login Admin Berhasil",
                    'redirect': '/admin',
                })
            else:
                return Response({'error': 'Akun Anda Tidak Terdaftar'}, status=401)

        return Response({'error': 'Login Gagal'}, status=401)


class LoginViewSiswa(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username dan password harus diisi'}, status=400)

        user = User.objects.filter(username=username).first()

        if not user:
            return Response({'error': 'Akun Belum Terdaftar'}, status=401)

        if not user.check_password(password):
            return Response({'error': 'Kata Sandi Salah'}, status=401)

        refresh = RefreshToken.for_user(user)

        request.session['last_login_date'] = datetime.now().date().isoformat()

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'access': str(refresh.access_token),  
            'refresh': str(refresh),             
            'redirect': '/e-learning',
            'message': "Login Berhasil",
        })
    
class LoginAkademikView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username dan password harus diisi'}, status=400)

        user = User.objects.filter(username=username).first()

        if not user:
            return Response({'error': 'Akun Belum Terdaftar'}, status=401)

        if not user.check_password(password):
            return Response({'error': 'Kata Sandi Salah'}, status=401)

        struktur_data = Akademik.objects.filter(id=username).first()
        if not struktur_data:
            return Response({'error': 'Data Struktur Sekolah tidak ditemukan'}, status=404)

        refresh = RefreshToken.for_user(user)
        request.session['last_login_date'] = datetime.now().date().isoformat()

        return Response({
            'id': struktur_data.id,
            'username': user.username,
            'email': user.email,
            'access': str(refresh.access_token),  
            'refresh': str(refresh),
            'posisi': struktur_data.Posisi, 
            'redirect': '/akademik',
            'message': "Login Berhasil",
        })



class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()

            if 'last_login_date' in request.session:
                del request.session['last_login_date']
            if 'last_active_time' in request.session:
                del request.session['last_active_time']

            return Response({'message': 'Logout successfully'})
        except TokenError as e:
            return Response({'error': str(e)}, status=400)


#=================================================Login=================================================


#=================================================Token=================================================
class TokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({'error': 'Refresh token tidak diberikan.'}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            new_access = refresh.access_token

            current_time = datetime.now()
            request.session['last_active_time'] = current_time.isoformat()

            return Response({'access': str(new_access), 'refresh': str(refresh)})
        except TokenError as e:
            return Response({'error': str(e)}, status=400)

#=================================================Token=================================================

#=================================================Siswa=================================================

class AddSiswaView(APIView):
    def post(self, request):
        try:
  
            if User.objects.filter(username=request.data.get('Nis')).exists():
                return Response({
                    'error': 'NIS already exists as a username',
                    'message': 'Nis Sudah Terdaftar'
                }, status=status.HTTP_400_BAD_REQUEST)

            nis = request.data.get('Nis')
            nama = request.data.get('Nama')
            jurusan = request.data.get('Jurusan')
            kelas = request.data.get('Kelas')

            default_password = make_password(nis)

            user_serializer = AkunSerializer(data={
                'username': nis,
                'password': default_password,
                'first_name': nama,
            })

            if user_serializer.is_valid():
                user_serializer.save()
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            siswa_serializer = DataSiswaSerializer(data={
                'id': nis,
                'Nis': nis,
                'Nama': nama,
                'Jurusan': jurusan,
                'Kelas': kelas,
                'Nisn': '',
                'JenisKelamin': '',
                'TanggalLahir': '',
                'TempatLahir': '',
                'Agama': '',
                'Alamat': '',
                'NoTelepon': '',
            })

            if siswa_serializer.is_valid():
                siswa_serializer.save()
                return Response({
                    'message': 'Data berhasil disimpan',
                    'redirect': '/admin/akun/siswa',
                }, status=status.HTTP_201_CREATED)
            else:
                print("Siswa serializer errors:", siswa_serializer.errors)
                return Response(siswa_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("Exception error:", e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetAllDataSiswaView(APIView):
    def get(self, request):
        sort_by_jurusan = request.query_params.get('jurusan', None)
        sort_by_kelas = request.query_params.get('kelas', None)
        get_unique = request.query_params.get('unique', 'false').lower() == 'true'

  
        if get_unique:
            unique_jurusan = DataSiswa.objects.values_list('Jurusan', flat=True).distinct()
            unique_kelas = DataSiswa.objects.values_list('Kelas', flat=True).distinct()
            return Response(
                {
                    "jurusan": list(unique_jurusan),
                    "kelas": list(unique_kelas),
                },
                status=status.HTTP_200_OK,
            )

        siswa_queryset = DataSiswa.objects.all()

        if sort_by_jurusan:
            siswa_queryset = siswa_queryset.filter(Jurusan__istartswith=sort_by_jurusan).order_by('Jurusan')

        if sort_by_kelas:
            siswa_queryset = siswa_queryset.filter(Kelas=sort_by_kelas).order_by('Kelas')

        serializer = GetAllDataSiswaSerializer(siswa_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateSiswaView(APIView):
    def get(self, request, Nis):
        try:
            siswa = DataSiswa.objects.filter(Nis=Nis).first()
            if not siswa:
                return Response({
                    'error': 'not_found',
                    'message': 'Data siswa tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = DataSiswaSerializer(siswa)
            return Response({
                'message': 'Data siswa ditemukan',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat mengambil data siswa',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, Nis):
        try:
            siswa = DataSiswa.objects.filter(Nis=Nis).first()
            if not siswa:
                return Response({
                    'error': 'not_found',
                    'message': 'Data siswa tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = DataSiswaSerializer(siswa, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Data siswa berhasil diperbarui',
                    'redirect': '/admin/akun/siswa',
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'validation_error',
                    'message': 'Data tidak valid',
                    'details': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat memperbarui data siswa',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteSiswaView(APIView):
    def delete(self, request, Nis):
        try:
            siswa = DataSiswa.objects.filter(Nis=Nis).first()
            if siswa:
                siswa.delete()
            else:
                return Response({
                    'error': 'Data siswa tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            user = User.objects.filter(username=Nis).first()
            if user:
                user.delete()
            else:
                return Response({
                    'error': 'User tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            return Response({
                'message': 'Data siswa berhasil dihapus'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("Error during delete:", e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#=================================================Siswa=================================================

#===============================================ELearning===============================================

class GetAllDataElearningView(APIView):
    def get(self, request, username):
        try:
            siswa = DataSiswa.objects.filter(Nis=username).first()
            if not siswa:
                return Response({
                    'error': 'not_found',
                    'message': 'Data siswa tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = DataSiswaSerializer(siswa)
            return Response({
                'message': 'Data siswa ditemukan',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat mengambil data siswa',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

#===============================================Struktur Akademik===============================================
class AddDataAkademikView(APIView):
    def post(self, request):
        try:
            nip = request.data.get('Nip')
            nuptk = request.data.get('Nuptk')
            nama = request.data.get('Nama')
            posisi = request.data.get('Posisi')
            kelas = request.data.get('Kelas', '')
            materi = request.data.get('Materi', [])

            username = nip if nip else nuptk

            if not isinstance(materi, list):
                materi = [materi] 
            
            if not nip:
                return Response({
                    'error': 'NIP Wajib diisi',
                    'message': 'NIP Wajib diisi'
                }, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(username=username).exists():
                return Response({
                    'error': 'Username already exists',
                    'message': 'NIP atau NUPTK sudah terdaftar sebagai username',
                }, status=status.HTTP_400_BAD_REQUEST)

            default_password = make_password(username)  
            user_serializer = AkunSerializer(data={
                'username': username,
                'password': default_password,
                'first_name': nama,
            })

            if user_serializer.is_valid():
                user_serializer.save()
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            sekolah_serializer = AkademikSerializer(data={
                'Nip': nip,
                'Nuptk': nuptk,
                'Nama': nama,
                'Posisi': posisi,
                'Kelas': kelas if posisi == "Guru" else "",
                'Materi': materi if posisi == "Guru" else [],
            })


            if sekolah_serializer.is_valid():
                sekolah_serializer.save()
                return Response({
                    'message': 'Data berhasil disimpan',
                    'redirect': '/admin/akun/akademik',
                }, status=status.HTTP_201_CREATED)
            else:
                return Response(sekolah_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            traceback.print_exc() 
            print("Exception error:", e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetAllDataAkademikView(APIView):
    def get(self, request):
        sort_by_posisi = request.query_params.get('posisi', None)
        sort_by_kelas = request.query_params.get('kelas', None)
        get_unique = request.query_params.get('unique', 'false').lower() == 'true'

        posisi_order = [
            "Kepala Sekolah",
            "Wakil Kepala Sekolah",
            "Tata Usaha",
            "Guru",
            "Staf"
        ]

        if get_unique:
            unique_posisi = Akademik.objects.values_list('Posisi', flat=True).distinct()
            unique_kelas = Akademik.objects.values_list('Kelas', flat=True).distinct()
            return Response(
                {
                    "posisi": list(unique_posisi),
                    "kelas": list(unique_kelas),
                },
                status=status.HTTP_200_OK,
            )

        queryset = Akademik.objects.all()

        if sort_by_posisi:
            queryset = queryset.filter(Posisi__icontains=sort_by_posisi).order_by('Posisi')

        if sort_by_kelas:
            queryset = queryset.filter(Kelas__icontains=sort_by_kelas).order_by('Kelas')

        ordered_queryset = sorted(
            queryset,
            key=lambda x: posisi_order.index(x.Posisi) if x.Posisi in posisi_order else len(posisi_order)
        )

        serializer = GetAllAkademikSerializer(ordered_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateDataAkademikView(APIView):
    def get(self, request, id):
        try:
            sekolah = Akademik.objects.filter(id=id).first()
            if not sekolah:
                return Response({
                    'error': 'not_found',
                    'message': 'Data sekolah tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = AkademikSerializer(sekolah)
            return Response({
                'message': 'Data sekolah ditemukan',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc() 
            print("Exception error:", e)
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat mendapatkan data sekolah',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request, id):
        print("Received data:", request.data)
        try:
            materi = request.data.get('Materi', [])
        
            if not isinstance(materi, list):
                materi = [materi] 
            
            sekolah = Akademik.objects.filter(id=id).first()
            if not sekolah:
                return Response({
                    'error': 'not_found',
                    'message': 'Data sekolah tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = AkademikSerializer(sekolah, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Data sekolah berhasil diupdate',
                    'redirect': '/admin/akun/akademik',
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            traceback.print_exc() 
            print("Exception error:", e)
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat memperbarui data sekolah',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteDataAkademikView(APIView):
    def delete(self, request, id):
        try:

            user = User.objects.filter(username=id).first()
            if user:
                user.delete()
            else:
                return Response({
                    'error': 'User tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)
            

            sekolah = Akademik.objects.filter(id=id).first()
            if not sekolah:
                return Response({
                    'error': 'not_found',
                    'message': 'Data sekolah tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            sekolah.delete()
            return Response({
                'message': 'Data sekolah berhasil dihapus',
                'redirect': '/admin/akun/akademik',
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc() 
            print("Exception error:", e)
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat menghapus data sekolah',
                'details': str(e)
            })
        
class GetUserAkademikView(APIView):
      def get(self, request, username):
        try:
            akademik = Akademik.objects.filter(id=username).first()
            if not akademik:
                return Response({
                    'error': 'not_found',
                    'message': 'Data akademik tidak ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = GetAllAkademikSerializer(akademik)
            return Response({
                'message': 'Data Akademik ditemukan',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat mengambil data akademik',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
#===============================================Chatbot==================================================
class AddChatView(APIView):
    def post(self, request):
        question = request.data.get('Question')  

        if not question:
            return Response({'error': 'Question Data Harus Diisi'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if not isinstance(question, dict):
                return Response({'error': 'Format Question harus berupa JSON'}, status=status.HTTP_400_BAD_REQUEST)
            
            chat = ChatBot.objects.create(
                Question=question     
            )
            serializer = ChatBotSerializer(chat)

            return Response({
                'message': 'Data Berhasil Ditambahkan',
                'data': serializer.data,
                'redirect': '/admin/chatbot/chat',
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            print("Exception error:", e)
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat menambahkan data chatbot',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


   
class GetAllChatView(APIView):
    def get(self, request):
        try:
            chat_queryset = ChatBot.objects.all()
            serializer = GetAllChatBotSerializer(chat_queryset, many=True)  

            if not serializer.data:
                return Response({
                    'message': 'Data Chatbot Kosong',
                }, status=status.HTTP_200_OK)

            return Response({
                'message': 'Data Chatbot ditemukan',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            print("Exception error:", e)
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat mengambil data chatbot',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UpdateChatView(APIView):
    def get(self, request, id):
        try:
            chat = ChatBot.objects.filter(id=id).first()
            if not chat:
                return Response({
                    'error': 'Data Chatbot Tidak Ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = GetAllChatBotSerializer(chat)
            return Response({
                'message': 'Data Chatbot Ditemukan',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat mengambil data chatbot',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def put(self, request, id):
        print("Request data:", request.data) 
        Question = request.data.get("Question")

        if not Question or not isinstance(Question, dict) or "question" not in Question:
            return Response({
                "error": "Format Data Question Tidak Valid"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            chat = ChatBot.objects.filter(id=id).first()

            if not chat:
                return Response({
                    "error": "Data Chatbot Tidak Ditemukan"
                }, status=status.HTTP_404_NOT_FOUND)
    
            if isinstance(Question["question"], list):
                chat.Question = Question
            else:
                return Response({
                    "error": "Format Data Question Tidak Valid"
                }, status=status.HTTP_400_BAD_REQUEST)

            chat.save()

            serializer = ChatBotSerializer(chat)
            return Response({
                "message": "Data Chatbot Berhasil Diperbarui",
                "redirect": "/admin/chatbot/chat",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            return Response({
                "error": "server_error",
                "message": "Terjadi kesalahan saat memperbarui data chatbot",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteDataChat (APIView):
    def delete(self, request, id):
        try:
            chat = ChatBot.objects.filter(id=id).first()
            if not chat:
                return Response({
                    'error': 'Data Chatbot Tidak Ditemukan'
                }, status=status.HTTP_404_NOT_FOUND)

            chat.delete()
            return Response({
                'message': 'Data Chatbot Berhasil Dihapus'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            print("Exception error:", e)
            return Response({
                'error': 'server_error',
                'message': 'Terjadi kesalahan saat menghapus data chatbot',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#==================================OpenAI=====================================
# class ResponseChatbot(APIView):
#     def post(self, request):
#         try:
#             question = request.data.get("Question", "").strip()
#             logger.info(f"Received question: {question}")

#             if not question:
#                 return Response({"error": "Question is required"}, status=status.HTTP_400_BAD_REQUEST)

#             client = OpenAI(
#                 api_key="", 
#                 organization=""  
#             )

#             chat_data = ChatBot.objects.filter(Question__icontains=question).first()
#             if chat_data:
#                 response = {
#                     "response": f"Database Response: {chat_data.Question}"
#                 }
#             else:
#                 completion = client.chat.completions.create(
#                     model="gpt-4o-mini",
#                     store=True,
#                     messages=[
#                         {"role": "system", "content": "You are a helpful chatbot."},
#                         {"role": "user", "content": question},
#                     ]
#                 )
#                 response_text = completion.choices[0].message["content"]

#                 response = {
#                     "response": response_text
#                 }

#             return Response(response, status=status.HTTP_200_OK)

#         except Exception as e:
#             logger.error("Error in ResponseChatbot", exc_info=True)
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#=======================================Gemini AI=====================================
class ResponseChatbot(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, *args, **kwargs):  
        user_message = request.data.get("Question")

        if not user_message:
            return Response({"error": "Pertanyaan tidak boleh kosong"}, status=400)
        print(f"User message: {user_message}")

        response_message = None  
        chat_data = ChatBot.objects.all()

        for data in chat_data:
            print(f"Checking database entry: {data.Question}")
            questions = data.Question.get("question", [])
            if any(user_message.lower() in q.lower() for q in questions):
                response_message = f"Nama saya adalah {data.Question.get('bot_name', 'Lazer Chatbot')}."
                print(f"Response found in database: {response_message}")
                break

        if response_message is None:
            print("No match in database. Using Gemini AI.")
            try:
                generation_config = {
                    "temperature": 1,
                    "top_p": 0.95,
                    "top_k": 40,
                    "max_output_tokens": 8192,
                    "response_mime_type": "text/plain",
                }
                model = genai.GenerativeModel(
                    model_name="gemini-1.5-pro",
                    generation_config=generation_config,
                )
                chat_session = model.start_chat(history=[])
                gemini_response = chat_session.send_message(user_message)
                response_message = gemini_response.text

            except Exception as e:
                response_message = f"Terjadi kesalahan dengan Gemini AI: {str(e)}"
        return Response({"response": response_message})
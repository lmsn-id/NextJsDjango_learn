from django.urls import path
from . import views

urlpatterns = [
    path('auth/login/admin', views.LoginViewAdmin.as_view(), name='login'),
    path('auth/login/siswa', views.LoginViewSiswa.as_view(), name='login'),
    path('auth/login/guru', views.LoginAkademikView.as_view(), name='login'),
    path('auth/refresh/', views.TokenRefreshView.as_view(), name='refresh'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
#=====================================================================================
    path('auth/addSiswa/', views.AddSiswaView.as_view(), name='addSiswa'),
    path('auth/GetAlldataSiswa', views.GetAllDataSiswaView.as_view(), name='dataSiswa'),
    path('auth/UpdateSiswa/<str:Nis>', views.UpdateSiswaView.as_view(), name='getSiswa'),
    path('auth/deleteSiswa/<str:Nis>/', views.DeleteSiswaView.as_view(), name='delete-siswa'),
    path('auth/GetSiswa/<str:kelas>', views.GetDataSiswaByKelasView.as_view(), name='GetUserSiswa'),
#=====================================================================================
    path('auth/GetDataElearning/<str:username>', views.GetAllDataElearningView.as_view(), name='dataElearning'),
#=====================================================================================
    path('auth/AddDataAkademik/', views.AddDataAkademikView.as_view(), name='AddDataAkademik'),
    path('auth/GetAllDataAkademik', views.GetAllDataAkademikView.as_view(), name='GetAllDataAkademik'),
    path('auth/UpdateDataAkademik/<str:id>', views.UpdateDataAkademikView.as_view(), name='GetDataAkademik'),
    path('auth/DeleteDataAkademik/<str:id>/', views.DeleteDataAkademikView.as_view(), name='DeleteDataAkademik'),
    path('auth/GetUserAkademik/<str:username>', views.GetUserAkademikView.as_view(), name='GetUserAkademik'),
#=====================================================================================
    path('auth/AddChat/', views.AddChatView.as_view(), name='AddChatChatBot'),
    path('auth/GetAllChat/', views.GetAllChatView.as_view(), name='GetAllChat'),
    path('auth/UpdateDataChat/<str:id>', views.UpdateChatView.as_view(), name='GetDataChat'),
    path('auth/DeleteDataChat/<str:id>/', views.DeleteDataChat.as_view(), name='DeleteChat'),
    # path('auth/sendMessage/', views.GetResponseChatbot.as_view(), name='SendMessage'),
    path('auth/sendMessage/', views.ResponseChatbot.as_view(), name='ResponseChatbot'),



]

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

urlpatterns = [
    path('register-teacher/', RegisterTeacherView.as_view(), name='register-teacher'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('create-student/', CreateStudentView.as_view(), name='create-student'),
    path('create-parent/', CreateParentView.as_view(), name='create-parent'),
]

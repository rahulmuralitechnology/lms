from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *

class RegisterTeacherView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterTeacherSerializer
    permission_classes = [AllowAny]

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class CreateStudentView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = CreateStudentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CreateParentView(generics.CreateAPIView):
    queryset = Parent.objects.all()
    serializer_class = CreateParentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
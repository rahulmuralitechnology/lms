from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class RegisterTeacherSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role='teacher'
        )
        Teacher.objects.create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            tokens = RefreshToken.for_user(user)
            return {
                'access': str(tokens.access_token),
                'refresh': str(tokens),
                'user': UserSerializer(user).data
            }
        raise serializers.ValidationError("Invalid credentials")

class ParentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Parent
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    parent = ParentSerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'

class CreateStudentSerializer(serializers.ModelSerializer):
    user = serializers.JSONField(write_only=True)  # Expecting raw JSON data for the user

    class Meta:
        model = Student
        fields = ["user", "teacher"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        # Check if user already exists
        if User.objects.filter(email=user_data.get("email")).exists():
            raise serializers.ValidationError({"email": "User with this email already exists."})

        username = user_data.get("username") or user_data.get("email").split("@")[0]
        password = user_data.get("password", "defaultpassword")

        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})

        user = User.objects.create_user(username=username, email=user_data["email"], password=password, role="student")

        student = Student.objects.create(user=user, **validated_data)
        return student

class CreateParentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Parent
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, role='parent')
        parent = Parent.objects.create(user=user)
        return parent
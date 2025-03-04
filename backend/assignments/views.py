from rest_framework import viewsets, permissions
from .models import Assignment, Quiz, Question, Submission
from .serializers import AssignmentSerializer, QuizSerializer, QuestionSerializer, SubmissionSerializer

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'teacher'

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

class IsParent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'parent'

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsTeacher()]
        return [permissions.IsAuthenticated()]

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsTeacher()]
        return [permissions.IsAuthenticated()]

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsTeacher()]
        return [permissions.IsAuthenticated()]

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsStudent()]
        return [permissions.IsAuthenticated()]

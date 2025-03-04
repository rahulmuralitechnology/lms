from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet, QuizViewSet, QuestionViewSet, SubmissionViewSet

router = DefaultRouter()
router.register(r'assignments', AssignmentViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'submissions', SubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

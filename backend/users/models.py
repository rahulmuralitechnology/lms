from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('parent', 'Parent'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teacher_profile")

    def __str__(self):
        return self.user.username

class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="parent_profile")

    def __str__(self):
        return self.user.username

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    teacher = models.ForeignKey("Teacher", on_delete=models.CASCADE, related_name="students")
    parent = models.ForeignKey("Parent", on_delete=models.SET_NULL, null=True, blank=True, related_name="students")

    def __str__(self):
        return self.user.username
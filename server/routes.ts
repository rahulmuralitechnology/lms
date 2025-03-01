import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertLessonSchema, insertQuizSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Lessons
  app.post("/api/lessons", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(403);
    }

    const lesson = insertLessonSchema.parse(req.body);
    const created = await storage.createLesson({
      ...lesson,
      teacherId: req.user.id,
    });
    res.status(201).json(created);
  });

  app.get("/api/lessons", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const lessons = req.user.role === "teacher"
      ? await storage.getLessonsByTeacher(req.user.id)
      : await storage.getLessonsByStudent(req.user.id);
    
    res.json(lessons);
  });

  // Quizzes
  app.post("/api/lessons/:lessonId/quizzes", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(403);
    }

    const quiz = insertQuizSchema.parse(req.body);
    const created = await storage.createQuiz({
      ...quiz,
      lessonId: parseInt(req.params.lessonId),
    });
    res.status(201).json(created);
  });

  app.get("/api/lessons/:lessonId/quizzes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const quizzes = await storage.getQuizzesByLesson(parseInt(req.params.lessonId));
    res.json(quizzes);
  });

  // Enrollments
  app.post("/api/enrollments", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "student") {
      return res.sendStatus(403);
    }

    const enrollment = await storage.createEnrollment({
      studentId: req.user.id,
      lessonId: req.body.lessonId,
      completed: false,
    });
    res.status(201).json(enrollment);
  });

  app.patch("/api/enrollments/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "student") {
      return res.sendStatus(403);
    }

    const completed = z.boolean().parse(req.body.completed);
    const updated = await storage.updateEnrollment(
      parseInt(req.params.id),
      completed,
    );
    res.json(updated);
  });

  // Quiz submissions
  app.post("/api/quizzes/:quizId/submit", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "student") {
      return res.sendStatus(403);
    }

    const submission = await storage.submitQuiz({
      quizId: parseInt(req.params.quizId),
      studentId: req.user.id,
      answers: req.body.answers,
      score: req.body.score,
    });
    res.status(201).json(submission);
  });

  // Parent-student relationships
  app.post("/api/parent-students", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "parent") {
      return res.sendStatus(403);
    }

    const relation = await storage.addParentStudent({
      parentId: req.user.id,
      studentId: req.body.studentId,
    });
    res.status(201).json(relation);
  });

  app.get("/api/parent-students", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "parent") {
      return res.sendStatus(403);
    }

    const students = await storage.getStudentsByParent(req.user.id);
    res.json(students);
  });

  const httpServer = createServer(app);
  return httpServer;
}

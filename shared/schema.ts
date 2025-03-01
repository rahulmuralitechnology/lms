import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const UserRole = {
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<UserRole>(),
  displayName: text("display_name").notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  teacherId: integer("teacher_id")
    .notNull()
    .references(() => users.id),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .notNull()
    .references(() => lessons.id),
  title: text("title").notNull(),
  questions: jsonb("questions").$type<{
    question: string;
    answer: string;
  }[]>().notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => users.id),
  lessonId: integer("lesson_id")
    .notNull()
    .references(() => lessons.id),
  completed: boolean("completed").notNull().default(false),
});

export const quizSubmissions = pgTable("quiz_submissions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id")
    .notNull()
    .references(() => quizzes.id),
  studentId: integer("student_id")
    .notNull()
    .references(() => users.id),
  answers: jsonb("answers").$type<{
    questionId: number;
    answer: string;
    audioUrl?: string;
  }[]>().notNull(),
  score: integer("score").notNull(),
});

export const parentStudents = pgTable("parent_students", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id")
    .notNull()
    .references(() => users.id),
  studentId: integer("student_id")
    .notNull()
    .references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const insertLessonSchema = createInsertSchema(lessons).omit({ teacherId: true });
export const insertQuizSchema = createInsertSchema(quizzes).omit({ lessonId: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type QuizSubmission = typeof quizSubmissions.$inferSelect;
export type ParentStudent = typeof parentStudents.$inferSelect;

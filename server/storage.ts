import createMemoryStore from "memorystore";
import session from "express-session";
import type {
  User,
  InsertUser,
  Lesson,
  Quiz,
  Enrollment,
  QuizSubmission,
  ParentStudent,
} from "@shared/schema";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lessons
  createLesson(lesson: Omit<Lesson, "id">): Promise<Lesson>;
  getLessonsByTeacher(teacherId: number): Promise<Lesson[]>;
  getLessonsByStudent(studentId: number): Promise<Lesson[]>;
  
  // Quizzes
  createQuiz(quiz: Omit<Quiz, "id">): Promise<Quiz>;
  getQuizzesByLesson(lessonId: number): Promise<Quiz[]>;
  
  // Enrollments
  createEnrollment(enrollment: Omit<Enrollment, "id">): Promise<Enrollment>;
  getEnrollmentsByStudent(studentId: number): Promise<Enrollment[]>;
  updateEnrollment(id: number, completed: boolean): Promise<Enrollment>;
  
  // Quiz submissions
  submitQuiz(submission: Omit<QuizSubmission, "id">): Promise<QuizSubmission>;
  getQuizSubmissionsByStudent(studentId: number): Promise<QuizSubmission[]>;
  
  // Parent-student relationships
  addParentStudent(relation: Omit<ParentStudent, "id">): Promise<ParentStudent>;
  getStudentsByParent(parentId: number): Promise<User[]>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lessons: Map<number, Lesson>;
  private quizzes: Map<number, Quiz>;
  private enrollments: Map<number, Enrollment>;
  private quizSubmissions: Map<number, QuizSubmission>;
  private parentStudents: Map<number, ParentStudent>;
  public sessionStore: session.Store;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.quizzes = new Map();
    this.enrollments = new Map();
    this.quizSubmissions = new Map();
    this.parentStudents = new Map();
    this.currentId = {
      users: 1,
      lessons: 1,
      quizzes: 1,
      enrollments: 1,
      quizSubmissions: 1,
      parentStudents: 1,
    };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLesson(lesson: Omit<Lesson, "id">): Promise<Lesson> {
    const id = this.currentId.lessons++;
    const newLesson = { ...lesson, id };
    this.lessons.set(id, newLesson);
    return newLesson;
  }

  async getLessonsByTeacher(teacherId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(
      (lesson) => lesson.teacherId === teacherId,
    );
  }

  async getLessonsByStudent(studentId: number): Promise<Lesson[]> {
    const enrollments = await this.getEnrollmentsByStudent(studentId);
    return Promise.all(
      enrollments.map((enrollment) => this.lessons.get(enrollment.lessonId)!),
    );
  }

  async createQuiz(quiz: Omit<Quiz, "id">): Promise<Quiz> {
    const id = this.currentId.quizzes++;
    const newQuiz = { ...quiz, id };
    this.quizzes.set(id, newQuiz);
    return newQuiz;
  }

  async getQuizzesByLesson(lessonId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(
      (quiz) => quiz.lessonId === lessonId,
    );
  }

  async createEnrollment(enrollment: Omit<Enrollment, "id">): Promise<Enrollment> {
    const id = this.currentId.enrollments++;
    const newEnrollment = { ...enrollment, id };
    this.enrollments.set(id, newEnrollment);
    return newEnrollment;
  }

  async getEnrollmentsByStudent(studentId: number): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(
      (enrollment) => enrollment.studentId === studentId,
    );
  }

  async updateEnrollment(id: number, completed: boolean): Promise<Enrollment> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) throw new Error("Enrollment not found");
    const updated = { ...enrollment, completed };
    this.enrollments.set(id, updated);
    return updated;
  }

  async submitQuiz(submission: Omit<QuizSubmission, "id">): Promise<QuizSubmission> {
    const id = this.currentId.quizSubmissions++;
    const newSubmission = { ...submission, id };
    this.quizSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getQuizSubmissionsByStudent(studentId: number): Promise<QuizSubmission[]> {
    return Array.from(this.quizSubmissions.values()).filter(
      (submission) => submission.studentId === studentId,
    );
  }

  async addParentStudent(relation: Omit<ParentStudent, "id">): Promise<ParentStudent> {
    const id = this.currentId.parentStudents++;
    const newRelation = { ...relation, id };
    this.parentStudents.set(id, newRelation);
    return newRelation;
  }

  async getStudentsByParent(parentId: number): Promise<User[]> {
    const relations = Array.from(this.parentStudents.values()).filter(
      (relation) => relation.parentId === parentId,
    );
    return Promise.all(
      relations.map((relation) => this.users.get(relation.studentId)!),
    );
  }
}

export const storage = new MemStorage();

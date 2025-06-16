import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  Student,
  Teacher,
  Course,
  Attendance,
  Exam,
  Book,
  Event,
  Grade,
  StudentAffairsCase,
  CaseType,
  CaseStatus,
  CasePriority,
  CaseComment,
  CaseAttachment,
} from '@/types';

interface SchoolStore {
  // Students
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudent: (id: string) => Student | undefined;

  // Teachers
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, data: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  getTeacher: (id: string) => Teacher | undefined;

  // Courses
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, data: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourse: (id: string) => Course | undefined;

  // Attendance
  attendance: Attendance[];
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: string, data: Partial<Attendance>) => void;
  deleteAttendance: (id: string) => void;
  getAttendance: (id: string) => Attendance | undefined;
  getStudentAttendance: (studentId: string) => Attendance[];

  // Exams
  exams: Exam[];
  addExam: (exam: Omit<Exam, 'id'>) => void;
  updateExam: (id: string, data: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  getExam: (id: string) => Exam | undefined;

  // Library
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, data: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  getBook: (id: string) => Book | undefined;
  borrowBook: (bookId: string, studentId: string) => void;
  returnBook: (bookId: string, studentId: string) => void;

  // Events
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, data: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;

  // Grades
  grades: Grade[];
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  updateGrade: (id: string, data: Partial<Grade>) => void;
  deleteGrade: (id: string) => void;
  getGrade: (id: string) => Grade | undefined;
  getStudentGrades: (studentId: string) => Grade[];

  // Student Affairs Cases
  cases: StudentAffairsCase[];
  addCase: (caseData: Omit<StudentAffairsCase, 'id' | 'createdAt' | 'updatedAt' | 'history' | 'metrics'>) => void;
  updateCase: (id: string, data: Partial<StudentAffairsCase>) => void;
  deleteCase: (id: string) => void;
  getCase: (id: string) => StudentAffairsCase | undefined;
  getStudentCases: (studentId: string) => StudentAffairsCase[];
  getCasesByType: (type: CaseType) => StudentAffairsCase[];
  getCasesByPriority: (priority: CasePriority) => StudentAffairsCase[];
  getCasesByStatus: (status: CaseStatus) => StudentAffairsCase[];
  addCaseComment: (caseId: string, comment: Omit<CaseComment, 'id' | 'createdAt'>) => void;
  addCaseAttachment: (caseId: string, attachment: Omit<CaseAttachment, 'id' | 'uploadedAt'>) => void;
  updateCaseStatus: (caseId: string, status: CaseStatus, comment?: string) => void;
  getCaseMetrics: () => {
    totalCases: number;
    openCases: number;
    resolvedCases: number;
    avgResponseTime: number;
    casesByType: Record<CaseType, number>;
    casesByPriority: Record<CasePriority, number>;
    casesByStatus: Record<CaseStatus, number>;
  };
}

export const useSchoolStore = create<SchoolStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        students: [],
        teachers: [],
        courses: [],
        attendance: [],
        exams: [],
        cases: [], // Initialize empty cases array

        // Students
        addStudent: (student) =>
          set((state) => ({
            students: [...state.students, { ...student, id: crypto.randomUUID() }],
          })),
        updateStudent: (id, data) =>
          set((state) => ({
            students: state.students.map((s) =>
              s.id === id ? { ...s, ...data } : s
            ),
          })),
        deleteStudent: (id) =>
          set((state) => ({
            students: state.students.filter((s) => s.id !== id),
          })),
        getStudent: (id) => get().students.find((s) => s.id === id),

        // Teachers
        addTeacher: (teacher) =>
          set((state) => ({
            teachers: [...state.teachers, { ...teacher, id: crypto.randomUUID() }],
          })),
        updateTeacher: (id, data) =>
          set((state) => ({
            teachers: state.teachers.map((t) =>
              t.id === id ? { ...t, ...data } : t
            ),
          })),
        deleteTeacher: (id) =>
          set((state) => ({
            teachers: state.teachers.filter((t) => t.id !== id),
          })),
        getTeacher: (id) => get().teachers.find((t) => t.id === id),

        // Courses
        addCourse: (course) =>
          set((state) => ({
            courses: [...state.courses, { ...course, id: crypto.randomUUID() }],
          })),
        updateCourse: (id, data) =>
          set((state) => ({
            courses: state.courses.map((c) =>
              c.id === id ? { ...c, ...data } : c
            ),
          })),
        deleteCourse: (id) =>
          set((state) => ({
            courses: state.courses.filter((c) => c.id !== id),
          })),
        getCourse: (id) => get().courses.find((c) => c.id === id),

        // Attendance
        addAttendance: (attendance) =>
          set((state) => ({
            attendance: [
              ...state.attendance,
              { ...attendance, id: crypto.randomUUID() },
            ],
          })),
        updateAttendance: (id, data) =>
          set((state) => ({
            attendance: state.attendance.map((a) =>
              a.id === id ? { ...a, ...data } : a
            ),
          })),
        deleteAttendance: (id) =>
          set((state) => ({
            attendance: state.attendance.filter((a) => a.id !== id),
          })),
        getAttendance: (id) => get().attendance.find((a) => a.id === id),
        getStudentAttendance: (studentId) =>
          get().attendance.filter((a) => a.studentId === studentId),

        // Exams
        addExam: (exam) =>
          set((state) => ({
            exams: [...state.exams, { ...exam, id: crypto.randomUUID() }],
          })),
        updateExam: (id, data) =>
          set((state) => ({
            exams: state.exams.map((e) => (e.id === id ? { ...e, ...data } : e)),
          })),
        deleteExam: (id) =>
          set((state) => ({
            exams: state.exams.filter((e) => e.id !== id),
          })),
        getExam: (id) => get().exams.find((e) => e.id === id),

        // Library
        addBook: (book) =>
          set((state) => ({
            books: [...state.books, { ...book, id: crypto.randomUUID() }],
          })),
        updateBook: (id, data) =>
          set((state) => ({
            books: state.books.map((b) => (b.id === id ? { ...b, ...data } : b)),
          })),
        deleteBook: (id) =>
          set((state) => ({
            books: state.books.filter((b) => b.id !== id),
          })),
        getBook: (id) => get().books.find((b) => b.id === id),
        borrowBook: (bookId, studentId) => {
          const book = get().getBook(bookId);
          if (book && book.availableCopies > 0) {
            get().updateBook(bookId, {
              availableCopies: book.availableCopies - 1,
              borrowHistory: [
                ...book.borrowHistory,
                {
                  studentId,
                  checkoutDate: new Date().toISOString(),
                  dueDate: new Date(
                    Date.now() + 14 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                  status: 'borrowed',
                },
              ],
            });
          }
        },
        returnBook: (bookId, studentId) => {
          const book = get().getBook(bookId);
          if (book) {
            const borrowRecord = book.borrowHistory.find(
              (h) => h.studentId === studentId && h.status === 'borrowed'
            );
            if (borrowRecord) {
              get().updateBook(bookId, {
                availableCopies: book.availableCopies + 1,
                borrowHistory: book.borrowHistory.map((h) =>
                  h === borrowRecord
                    ? {
                        ...h,
                        status: 'returned',
                        returnDate: new Date().toISOString(),
                      }
                    : h
                ),
              });
            }
          }
        },

        // Events
        addEvent: (event) =>
          set((state) => ({
            events: [...state.events, { ...event, id: crypto.randomUUID() }],
          })),
        updateEvent: (id, data) =>
          set((state) => ({
            events: state.events.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          })),
        deleteEvent: (id) =>
          set((state) => ({
            events: state.events.filter((e) => e.id !== id),
          })),
        getEvent: (id) => get().events.find((e) => e.id === id),

        // Grades
        addGrade: (grade) =>
          set((state) => ({
            grades: [...state.grades, { ...grade, id: crypto.randomUUID() }],
          })),
        updateGrade: (id, data) =>
          set((state) => ({
            grades: state.grades.map((g) =>
              g.id === id ? { ...g, ...data } : g
            ),
          })),
        deleteGrade: (id) =>
          set((state) => ({
            grades: state.grades.filter((g) => g.id !== id),
          })),
        getGrade: (id) => get().grades.find((g) => g.id === id),
        getStudentGrades: (studentId) =>
          get().grades.filter((g) => g.studentId === studentId),

        // Student Affairs Cases
        addCase: (caseData) =>
          set((state) => ({
            cases: [
              ...state.cases,
              {
                ...caseData,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                history: [],
                metrics: {
                  daysOpen: 0,
                  responseTime: 0,
                  totalComments: 0,
                  totalAttachments: 0,
                }
              }
            ]
          })),
        updateCase: (id, data) =>
          set((state) => ({
            cases: state.cases.map((c) =>
              c.id === id
                ? {
                    ...c,
                    ...data,
                    updatedAt: new Date().toISOString(),
                    history: [
                      ...c.history,
                      {
                        id: crypto.randomUUID(),
                        timestamp: new Date().toISOString(),
                        action: 'update',
                        performedBy: 'system',
                      }
                    ]
                  }
                : c
            )
          })),
        deleteCase: (id) =>
          set((state) => ({
            cases: state.cases.filter((c) => c.id !== id)
          })),
        getCase: (id) => get().cases.find((c) => c.id === id),
        getStudentCases: (studentId) => get().cases.filter((c) => c.studentId === studentId),
        getCasesByType: (type) => get().cases.filter((c) => c.type === type),
        getCasesByPriority: (priority) => get().cases.filter((c) => c.priority === priority),
        getCasesByStatus: (status) => get().cases.filter((c) => c.status === status),
        addCaseComment: (caseId, comment) =>
          set((state) => ({
            cases: state.cases.map((c) =>
              c.id === caseId
                ? {
                    ...c,
                    comments: [
                      ...c.comments,
                      {
                        ...comment,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                      }
                    ],
                    metrics: {
                      ...c.metrics,
                      totalComments: c.metrics.totalComments + 1
                    }
                  }
                : c
            )
          })),
        addCaseAttachment: (caseId, attachment) =>
          set((state) => ({
            cases: state.cases.map((c) =>
              c.id === caseId
                ? {
                    ...c,
                    attachments: [
                      ...c.attachments,
                      {
                        ...attachment,
                        id: crypto.randomUUID(),
                        uploadedAt: new Date().toISOString(),
                      }
                    ],
                    metrics: {
                      ...c.metrics,
                      totalAttachments: c.metrics.totalAttachments + 1
                    }
                  }
                : c
            )
          })),
        updateCaseStatus: (caseId, status, comment) =>
          set((state) => ({
            cases: state.cases.map((c) =>
              c.id === caseId
                ? {
                    ...c,
                    status,
                    history: [
                      ...c.history,
                      {
                        id: crypto.randomUUID(),
                        timestamp: new Date().toISOString(),
                        action: 'status-change',
                        oldValue: c.status,
                        newValue: status,
                        performedBy: 'system'
                      }
                    ],
                    ...(status === 'resolved' && {
                      resolvedAt: new Date().toISOString()
                    })
                  }
                : c
            )
          })),
        getCaseMetrics: () => {
          const cases = get().cases;
          return {
            totalCases: cases.length,
            openCases: cases.filter((c) => c.status !== 'closed' && c.status !== 'resolved').length,
            resolvedCases: cases.filter((c) => c.status === 'resolved').length,
            avgResponseTime: cases.length ? cases.reduce((acc, c) => acc + c.metrics.responseTime, 0) / cases.length : 0,
            casesByType: cases.reduce((acc, c) => ({
              ...acc,
              [c.type]: (acc[c.type] || 0) + 1
            }), {} as Record<CaseType, number>),
            casesByPriority: cases.reduce((acc, c) => ({
              ...acc,
              [c.priority]: (acc[c.priority] || 0) + 1
            }), {} as Record<CasePriority, number>),
            casesByStatus: cases.reduce((acc, c) => ({
              ...acc,
              [c.status]: (acc[c.status] || 0) + 1
            }), {} as Record<CaseStatus, number>)
          };
        },
      }),
      {
        name: 'school-store',
      }
    )
  )
);

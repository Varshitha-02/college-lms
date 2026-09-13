export type UserRole = 'student' | 'faculty';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title?: string;
  department: string;
  avatarUrl: string;
  email: string;
  studentId?: string;
  major?: string;
  gpa?: number;
  cumulativeCredits?: number;
  termCredits?: number;
  academicStanding?: string;
}

export interface AssignmentRubricItem {
  criterion: string;
  points: number;
  earnedPoints?: number;
  description: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  category: 'Homework' | 'Lab' | 'Project' | 'Midterm' | 'Final' | 'Quiz' | 'Essay';
  dueDate: string;
  dueTime: string;
  points: number;
  weightPercent?: number;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  score?: number;
  instructions: string;
  allowedSubmissions?: string;
  rubric?: AssignmentRubricItem[];
  submittedFile?: string;
  submittedAt?: string;
  feedback?: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  type: 'lecture' | 'reading' | 'assignment' | 'quiz' | 'external_link' | 'file';
  durationOrPages?: string;
  completed?: boolean;
  url?: string;
  assignmentId?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  week: string;
  description: string;
  isPublished: boolean;
  items: ModuleItem[];
}

export interface DiscussionReply {
  id: string;
  authorName: string;
  authorRole: 'student' | 'faculty' | 'ta';
  authorAvatar: string;
  content: string;
  postedAt: string;
  isEndorsed?: boolean;
  likes: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  authorName: string;
  authorRole: 'student' | 'faculty' | 'ta';
  authorAvatar: string;
  content: string;
  category: 'General' | 'Homework Q&A' | 'Exam Prep' | 'Project Groups';
  postedAt: string;
  pinned?: boolean;
  repliesCount: number;
  views: number;
  replies: DiscussionReply[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  dueDate: string;
  totalPoints: number;
  questions: QuizQuestion[];
  completed?: boolean;
  lastScore?: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  term: string;
  credits: number;
  instructor: {
    name: string;
    title: string;
    email: string;
    office: string;
    officeHours: string;
    avatarUrl: string;
  };
  schedule: {
    days: string;
    time: string;
    location: string;
  };
  accentColor: string; // Tailwind color token or hex
  badgeColor: string;
  coverImage: string;
  currentScore: number;
  letterGrade: string;
  syllabus: {
    overview: string;
    prerequisites: string[];
    gradingScale: { grade: string; minPercentage: number }[];
    gradeWeights: { category: string; weight: number }[];
    textbooks: string[];
    officeLocation: string;
  };
  modules: CourseModule[];
  assignments: Assignment[];
  discussions: DiscussionThread[];
  quizzes: Quiz[];
}

export interface CampusAnnouncement {
  id: string;
  title: string;
  author: string;
  department: string;
  date: string;
  priority: 'normal' | 'urgent' | 'highlight';
  summary: string;
  badge: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'class' | 'assignment' | 'exam' | 'office_hours';
  courseCode?: string;
  courseColor: string;
  date: string; // YYYY-MM-DD
  time: string;
  location?: string;
  points?: number;
}

export interface MessageThread {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  subject: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  courseCode?: string;
  messages: {
    id: string;
    sender: string;
    avatar: string;
    isMe: boolean;
    text: string;
    time: string;
  }[];
}

export type LMSNavTab =
  | 'dashboard'
  | 'courses'
  | 'course-detail'
  | 'assignments'
  | 'calendar'
  | 'grades'
  | 'inbox'
  | 'resources';

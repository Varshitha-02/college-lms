import React, { useState, useEffect } from 'react';
import {
  mockStudent,
  mockFaculty,
  mockCourses,
  mockCampusAnnouncements,
  mockCalendarEvents,
  mockMessages,
} from './data/mockData';
import {
  LMSNavTab,
  UserRole,
  Course,
  Assignment,
  Quiz,
  UserProfile,
} from './types';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { CoursesListView } from './components/CoursesListView';
import { CourseDetailView } from './components/CourseDetailView';
import { AssignmentsListView } from './components/AssignmentsListView';
import { CalendarView } from './components/CalendarView';
import { GradesView } from './components/GradesView';
import { InboxView } from './components/InboxView';
import { ResourcesView } from './components/ResourcesView';
import { AssignmentSubmitModal } from './components/AssignmentSubmitModal';
import { QuizModal } from './components/QuizModal';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<LMSNavTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('cs-301');
  const [activeTerm, setActiveTerm] = useState('Fall 2026');

  // Modals state
  const [activeSubmitModal, setActiveSubmitModal] = useState<{
    assignment: Assignment;
    course: Course;
  } | null>(null);

  const [activeQuizModal, setActiveQuizModal] = useState<Quiz | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentUser: UserProfile =
    currentRole === 'student' ? mockStudent : mockFaculty;

  // Toggle user role between Student and Faculty
  const handleToggleRole = () => {
    setCurrentRole((prev) => (prev === 'student' ? 'faculty' : 'student'));
  };

  // Select course and open course detail view
  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentTab('course-detail');
    setMobileSidebarOpen(false);
  };

  // Open assignment submission modal
  const handleOpenAssignmentSubmit = (assignment: Assignment, course: Course) => {
    setActiveSubmitModal({ assignment, course });
  };

  // Handle successful assignment submission
  const handleAssignmentSubmitSuccess = (
    assignmentId: string,
    fileName: string
  ) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        const updatedAssignments = c.assignments.map((asg) => {
          if (asg.id === assignmentId) {
            return {
              ...asg,
              status: 'submitted' as const,
              submittedFile: fileName,
              submittedAt: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
          }
          return asg;
        });

        const updatedModules = c.modules.map((m) => ({
          ...m,
          items: m.items.map((i) =>
            i.assignmentId === assignmentId ? { ...i, completed: true } : i
          ),
        }));

        return {
          ...c,
          assignments: updatedAssignments,
          modules: updatedModules,
        };
      })
    );
  };

  // Handle quiz completion
  const handleQuizComplete = (quizId: string, score: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => ({
        ...c,
        quizzes: c.quizzes.map((q) =>
          q.id === quizId ? { ...q, completed: true, lastScore: score } : q
        ),
      }))
    );
  };

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar: Desktop & Mobile Drawer */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setMobileSidebarOpen(false);
          }}
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={handleSelectCourse}
          currentUser={currentUser}
          unreadMessagesCount={mockMessages.filter((m) => m.unread).length}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header Bar Toggle */}
        <div className="md:hidden flex items-center justify-between p-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-extrabold text-blue-600">LearnPool LMS</span>
          <div className="w-5" />
        </div>

        {/* Global Desktop Top Header */}
        <TopHeader
          currentTab={currentTab}
          currentRole={currentRole}
          onToggleRole={handleToggleRole}
          currentUser={currentUser}
          courses={courses}
          onSelectCourse={handleSelectCourse}
          selectedCourseId={selectedCourseId}
          activeTerm={activeTerm}
          onChangeTerm={setActiveTerm}
        />

        {/* Dynamic Screen Body */}
        <main className="flex-1 overflow-y-auto bg-slate-50/60 pb-12">
          {currentTab === 'dashboard' && (
            <DashboardView
              courses={courses}
              currentUser={currentUser}
              announcements={mockCampusAnnouncements}
              onSelectCourse={handleSelectCourse}
              onOpenAssignmentSubmit={handleOpenAssignmentSubmit}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesListView
              courses={courses}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {currentTab === 'course-detail' && selectedCourse && (
            <CourseDetailView
              course={selectedCourse}
              currentUser={currentUser}
              onBack={() => setCurrentTab('courses')}
              onOpenAssignmentSubmit={handleOpenAssignmentSubmit}
              onTakeQuiz={(quiz) => setActiveQuizModal(quiz)}
            />
          )}

          {currentTab === 'assignments' && (
            <AssignmentsListView
              courses={courses}
              onOpenAssignmentSubmit={handleOpenAssignmentSubmit}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarView
              events={mockCalendarEvents}
              courses={courses}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {currentTab === 'grades' && (
            <GradesView
              courses={courses}
              currentUser={currentUser}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {currentTab === 'inbox' && (
            <InboxView
              threads={mockMessages}
              currentUser={currentUser}
            />
          )}

          {currentTab === 'resources' && <ResourcesView />}
        </main>
      </div>

      {/* Deliverable Submission Modal */}
      {activeSubmitModal && (
        <AssignmentSubmitModal
          assignment={activeSubmitModal.assignment}
          course={activeSubmitModal.course}
          onClose={() => setActiveSubmitModal(null)}
          onSubmitSuccess={(id, fileName) => {
            handleAssignmentSubmitSuccess(id, fileName);
          }}
        />
      )}

      {/* Online Assessment / Quiz Modal */}
      {activeQuizModal && (
        <QuizModal
          quiz={activeQuizModal}
          onClose={() => setActiveQuizModal(null)}
          onComplete={(id, score) => handleQuizComplete(id, score)}
        />
      )}
    </div>
  );
}

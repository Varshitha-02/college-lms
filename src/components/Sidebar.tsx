import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CheckSquare,
  GraduationCap,
  Inbox,
  BookmarkCheck,
  ChevronRight,
  Sparkles,
  School,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { LMSNavTab, Course, UserProfile } from '../types';
import { LearnPoolLogo } from './LearnPoolLogo';

interface SidebarProps {
  currentTab: LMSNavTab;
  onSelectTab: (tab: LMSNavTab) => void;
  courses: Course[];
  selectedCourseId: string | null;
  onSelectCourse: (courseId: string) => void;
  currentUser: UserProfile;
  unreadMessagesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  courses,
  selectedCourseId,
  onSelectCourse,
  currentUser,
  unreadMessagesCount,
}) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen select-none flex-shrink-0 z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <LearnPoolLogo size="md" />
      </div>

      {/* University Term Badge */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-blue-600" />
            <span>Collegiate Term: Fall 2026</span>
          </div>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
        </div>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Academic Portal
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard
                className={`w-4 h-4 ${
                  currentTab === 'dashboard' ? 'text-blue-600' : 'text-slate-500'
                }`}
              />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onSelectTab('courses')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'courses' || currentTab === 'course-detail'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen
                  className={`w-4 h-4 ${
                    currentTab === 'courses' || currentTab === 'course-detail'
                      ? 'text-blue-600'
                      : 'text-slate-500'
                  }`}
                />
                <span>Courses</span>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                {courses.length}
              </span>
            </button>

            <button
              onClick={() => onSelectTab('assignments')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'assignments'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare
                  className={`w-4 h-4 ${
                    currentTab === 'assignments' ? 'text-blue-600' : 'text-slate-500'
                  }`}
                />
                <span>Assignments</span>
              </div>
              <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                3 Due
              </span>
            </button>

            <button
              onClick={() => onSelectTab('calendar')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'calendar'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <Calendar
                className={`w-4 h-4 ${
                  currentTab === 'calendar' ? 'text-blue-600' : 'text-slate-500'
                }`}
              />
              <span>Calendar</span>
            </button>

            <button
              onClick={() => onSelectTab('grades')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'grades'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap
                  className={`w-4 h-4 ${
                    currentTab === 'grades' ? 'text-blue-600' : 'text-slate-500'
                  }`}
                />
                <span>Grades & Records</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                3.88 GPA
              </span>
            </button>

            <button
              onClick={() => onSelectTab('inbox')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'inbox'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox
                  className={`w-4 h-4 ${
                    currentTab === 'inbox' ? 'text-blue-600' : 'text-slate-500'
                  }`}
                />
                <span>Inbox</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="text-[11px] font-bold bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('resources')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
                currentTab === 'resources'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <BookmarkCheck
                className={`w-4 h-4 ${
                  currentTab === 'resources' ? 'text-blue-600' : 'text-slate-500'
                }`}
              />
              <span>Campus Services</span>
            </button>
          </nav>
        </div>

        {/* Quick Enrolled Courses List */}
        <div>
          <div className="flex items-center justify-between px-3 mb-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Courses
            </p>
            <button
              onClick={() => onSelectTab('courses')}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center"
            >
              All
            </button>
          </div>
          <div className="space-y-1">
            {courses.slice(0, 5).map((course) => {
              const isSelected =
                currentTab === 'course-detail' && selectedCourseId === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors group ${
                    isSelected
                      ? 'bg-slate-100 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        course.accentColor === 'blue'
                          ? 'bg-blue-500'
                          : course.accentColor === 'emerald'
                          ? 'bg-emerald-500'
                          : course.accentColor === 'amber'
                          ? 'bg-amber-500'
                          : course.accentColor === 'indigo'
                          ? 'bg-indigo-500'
                          : 'bg-teal-500'
                      }`}
                    />
                    <span className="font-mono text-slate-500">{course.code}</span>
                    <span className="truncate text-slate-700 font-medium">
                      {course.name.split(' ')[0]}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 group-hover:text-blue-600 font-bold ml-1">
                    {course.letterGrade}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Card at bottom */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-[11px] text-slate-500 truncate capitalize">
              {currentUser.role === 'student' ? currentUser.major?.split('&')[0] : currentUser.title}
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
        </div>
      </div>
    </aside>
  );
};

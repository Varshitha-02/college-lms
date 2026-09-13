import React, { useState } from 'react';
import {
  Search,
  Bell,
  UserCheck,
  CheckCircle2,
  Calendar as CalendarIcon,
  ChevronDown,
  Sparkles,
  BookOpen,
  ArrowRight,
  School,
  X,
  User,
} from 'lucide-react';
import { LMSNavTab, UserRole, UserProfile, Course } from '../types';

interface TopHeaderProps {
  currentTab: LMSNavTab;
  currentRole: UserRole;
  onToggleRole: () => void;
  currentUser: UserProfile;
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  selectedCourseId: string | null;
  activeTerm: string;
  onChangeTerm: (term: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  currentRole,
  onToggleRole,
  currentUser,
  courses,
  onSelectCourse,
  selectedCourseId,
  activeTerm,
  onChangeTerm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTermDropdown, setShowTermDropdown] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  // Search filter
  const filteredCourses = searchQuery.trim()
    ? courses.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getBreadcrumb = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Collegiate Academic Dashboard';
      case 'courses':
        return 'Enrolled Courses & Curricula';
      case 'course-detail':
        return selectedCourse ? `${selectedCourse.code}: ${selectedCourse.name}` : 'Course Details';
      case 'assignments':
        return 'Assignments & Deliverables Hub';
      case 'calendar':
        return 'Academic Timetable & Schedule';
      case 'grades':
        return 'Official Transcript & Academic Standing';
      case 'inbox':
        return 'Collegiate Inbox & Communications';
      case 'resources':
        return 'Campus Services & Academic Resources';
      default:
        return 'LearnPool LMS';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-10 sticky top-0">
      {/* Title / Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <h1 className="text-base font-bold text-slate-900 truncate">
          {getBreadcrumb()}
        </h1>
        {selectedCourse && currentTab === 'course-detail' && (
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
            {selectedCourse.term}
          </span>
        )}
      </div>

      {/* Center Search */}
      <div className="relative flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search courses, professors, assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Matching Courses ({filteredCourses.length})
            </p>
            {filteredCourses.length > 0 ? (
              <div className="space-y-1">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c.id);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-xs text-slate-800 group"
                  >
                    <div>
                      <span className="font-mono font-bold text-blue-600 mr-2">
                        {c.code}
                      </span>
                      <span className="font-medium text-slate-900">{c.name}</span>
                      <p className="text-[11px] text-slate-500">{c.instructor.name}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 px-2 py-2">
                No matching courses or items found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Term Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowTermDropdown(!showTermDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100/90 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>{activeTerm}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
          {showTermDropdown && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-md py-1 z-30">
              {['Fall 2026', 'Spring 2026', 'Summer 2026'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    onChangeTerm(term);
                    setShowTermDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 ${
                    activeTerm === term ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role Switcher Button */}
        <button
          onClick={onToggleRole}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-200 bg-blue-50/80 text-blue-700 hover:bg-blue-100 transition-colors shadow-2xs"
          title="Toggle between Student view and Faculty view"
        >
          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Role:</span>
          <span className="capitalize font-bold text-blue-900">{currentRole}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Academic Alerts</span>
                <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span>Grade Posted: CS 301</span>
                    <span className="text-[10px] text-slate-400">2h ago</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Project 1: High-Performance Routing Engine received 146/150 (97.3%).
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span>Deadline Approaching</span>
                    <span className="text-[10px] text-slate-400">Due Tomorrow</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    CS 301 Problem Set 4: Network Flows & Bipartite Matching due 11:59 PM.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Registrar Notice</span>
                    <span className="text-[10px] text-slate-400">1d ago</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Spring 2027 priority enrollment appointments posted to degree audit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Mini */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};

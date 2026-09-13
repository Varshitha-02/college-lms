import React from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Upload,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  MapPin,
  FileText,
  FileCheck2,
  Megaphone,
} from 'lucide-react';
import { Course, UserProfile, CampusAnnouncement, Assignment } from '../types';

interface DashboardViewProps {
  courses: Course[];
  currentUser: UserProfile;
  announcements: CampusAnnouncement[];
  onSelectCourse: (courseId: string) => void;
  onOpenAssignmentSubmit: (assignment: Assignment, course: Course) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  courses,
  currentUser,
  announcements,
  onSelectCourse,
  onOpenAssignmentSubmit,
  onNavigateTab,
}) => {
  // Aggregate all pending assignments across courses
  const upcomingAssignments = courses.flatMap((course) =>
    course.assignments.map((assignment) => ({
      ...assignment,
      courseCode: course.code,
      courseName: course.name,
      courseAccent: course.accentColor,
      course,
    }))
  );

  const pendingList = upcomingAssignments
    .filter((a) => a.status === 'pending')
    .slice(0, 4);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 md:p-8 shadow-sm border border-slate-800">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {currentUser.role === 'student' ? 'Undergraduate Senior' : 'Faculty Member'}
              </span>
              <span className="text-xs text-slate-400">
                Student ID: #{currentUser.studentId || 'FAC-1028'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentUser.department} • {currentUser.major}
            </p>
          </div>

          {/* Quick Academic Standing Badge */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 rounded-xl self-start md:self-auto">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                Academic Standing
              </p>
              <p className="text-sm font-bold text-white">
                {currentUser.academicStanding || 'Good Standing'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Metric Highlights */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 font-medium">Term GPA</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-mono font-bold text-emerald-400">
                {currentUser.gpa?.toFixed(2) || '3.88'}
              </span>
              <span className="text-xs text-slate-400">/ 4.00</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 font-medium">Enrolled Credits</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-mono font-bold text-white">
                {currentUser.termCredits || '16.0'}
              </span>
              <span className="text-xs text-slate-400">Hrs</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 font-medium">Pending Tasks</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-mono font-bold text-amber-400">
                {pendingList.length}
              </span>
              <span className="text-xs text-slate-400">Due soon</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 font-medium">Class Attendance</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-mono font-bold text-blue-400">97.4%</span>
              <span className="text-xs text-slate-400">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Courses & Right To-Do / Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Enrolled Courses & Announcements */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Current Term Courses
              </h2>
              <p className="text-xs text-slate-500">
                Fall 2026 Curriculum • 5 Registered Courses
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('courses')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>View All Courses</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Courses Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Hotlinked Academic Image Banner */}
                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.coverImage}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

                  {/* Badges on Banner */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white/90 backdrop-blur-sm text-slate-900 shadow-2xs">
                      {course.code}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-black/40 backdrop-blur-sm text-white border border-white/20">
                      {course.credits} Credits
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
                    <div className="min-w-0 pr-2">
                      <p className="text-[11px] text-slate-300 font-medium">
                        {course.department}
                      </p>
                      <h3 className="text-sm font-bold truncate text-white leading-snug">
                        {course.name}
                      </h3>
                    </div>
                    {/* Current Grade Badge */}
                    <div className="bg-white text-slate-900 px-2 py-1 rounded-lg text-right shadow-sm flex-shrink-0">
                      <span className="block text-[9px] uppercase font-bold text-slate-400 leading-none">
                        Grade
                      </span>
                      <span className="text-xs font-mono font-extrabold text-blue-600">
                        {course.letterGrade} ({course.currentScore}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  {/* Instructor & Meeting Info */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.avatarUrl}
                        alt={course.instructor.name}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-medium text-slate-700">
                        {course.instructor.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.schedule.days} • {course.schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{course.schedule.location}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{course.assignments.length} assignments</span>
                    </div>
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Enter Course</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Announcements */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Campus & Registrar Announcements
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Official Notices</span>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ann.priority === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : ann.priority === 'highlight'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {ann.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {ann.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex-shrink-0">
                      {ann.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ann.summary}
                  </p>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Issued by: {ann.author} • {ann.department}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: To-Do Submissions & Daily Schedule */}
        <div className="lg:col-span-4 space-y-6">
          {/* Urgent To-Do & Submissions */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Upcoming Deadlines
                </h3>
              </div>
              <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => onNavigateTab('assignments')}>
                View All
              </span>
            </div>

            {pendingList.length > 0 ? (
              <div className="space-y-2.5">
                {pendingList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:border-blue-200 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                        {item.courseCode}
                      </span>
                      <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.dueDate}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.category} • {item.points} pts • Due {item.dueTime}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenAssignmentSubmit(item, item.course)}
                      className="w-full mt-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit Deliverable</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">
                All assignments submitted!
              </p>
            )}
          </div>

          {/* Today's Schedule Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Today's Timetable
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Monday</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex gap-3 p-2.5 rounded-lg bg-blue-50/50 border-l-4 border-blue-600">
                <div className="font-mono text-slate-500 text-[11px] pt-0.5">
                  10:00 AM
                </div>
                <div>
                  <p className="font-bold text-slate-900">CS 301 Lecture</p>
                  <p className="text-[11px] text-slate-500">Hopper Hall 101 • Dr. Vance</p>
                </div>
              </div>

              <div className="flex gap-3 p-2.5 rounded-lg bg-emerald-50/50 border-l-4 border-emerald-600">
                <div className="font-mono text-slate-500 text-[11px] pt-0.5">
                  1:30 PM
                </div>
                <div>
                  <p className="font-bold text-slate-900">BIO 210 Wet Lab</p>
                  <p className="text-[11px] text-slate-500">Franklin BioSciences 220</p>
                </div>
              </div>

              <div className="flex gap-3 p-2.5 rounded-lg bg-slate-50 border-l-4 border-slate-400">
                <div className="font-mono text-slate-500 text-[11px] pt-0.5">
                  3:00 PM
                </div>
                <div>
                  <p className="font-bold text-slate-900">Academic Advising Check-in</p>
                  <p className="text-[11px] text-slate-500">Dean of Students Suite 210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Services Quick Links */}
          <div className="bg-slate-100/70 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Collegiate Quick Links
            </p>
            <div className="space-y-1 font-medium text-slate-700">
              <a
                href="#library"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTab('resources');
                }}
                className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors"
              >
                <span>University Library Reserves & JSTOR</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="#advising"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTab('resources');
                }}
                className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors"
              >
                <span>Writing Center Consultations</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="#grades"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTab('grades');
                }}
                className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors"
              >
                <span>Degree Audit & Graduation Tracker</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

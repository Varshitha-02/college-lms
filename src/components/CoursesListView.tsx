import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  MapPin,
  FileCheck2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Course } from '../types';

interface CoursesListViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export const CoursesListView: React.FC<CoursesListViewProps> = ({
  courses,
  onSelectCourse,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const departments = ['all', ...Array.from(new Set(courses.map((c) => c.department)))];

  const filtered = courses.filter((c) => {
    if (selectedDept !== 'all' && c.department !== selectedDept) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Academic Courses & Curricula
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fall 2026 Term • Enrolled Lecture Sections, Syllabi & Gradebooks
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search courses or faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              selectedDept === dept
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {dept === 'all' ? 'All Departments' : dept}
          </button>
        ))}
      </div>

      {/* Courses Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
          >
            {/* Hotlinked Cover Image */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
              <img
                src={course.coverImage}
                alt={course.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

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
                  <p className="text-[10px] text-slate-300 font-medium">
                    {course.department}
                  </p>
                  <h3 className="text-sm font-bold truncate text-white leading-snug">
                    {course.name}
                  </h3>
                </div>
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

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
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

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {course.modules.length} Modules Published
                </span>
                <button
                  onClick={() => onSelectCourse(course.id)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>Open Course</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

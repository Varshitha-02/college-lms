import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Filter,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
} from 'lucide-react';
import { Course, Assignment } from '../types';

interface AssignmentsListViewProps {
  courses: Course[];
  onOpenAssignmentSubmit: (assignment: Assignment, course: Course) => void;
  onSelectCourse: (courseId: string) => void;
}

export const AssignmentsListView: React.FC<AssignmentsListViewProps> = ({
  courses,
  onOpenAssignmentSubmit,
  onSelectCourse,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten assignments
  const allAssignments = courses.flatMap((course) =>
    course.assignments.map((asg) => ({
      ...asg,
      course,
    }))
  );

  const filtered = allAssignments.filter((asg) => {
    if (filterStatus !== 'all' && asg.status !== filterStatus) return false;
    if (selectedCourseFilter !== 'all' && asg.course.id !== selectedCourseFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        asg.title.toLowerCase().includes(q) ||
        asg.course.code.toLowerCase().includes(q) ||
        asg.category.toLowerCase().includes(q)
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
            Assignments & Academic Deliverables
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidated submission ledger across all enrolled Fall 2026 courses
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search deliverables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'pending', label: 'Pending / Due Soon' },
            { id: 'submitted', label: 'Turned In' },
            { id: 'graded', label: 'Graded' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterStatus(pill.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterStatus === pill.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Course Filter Dropdown */}
        <select
          value={selectedCourseFilter}
          onChange={(e) => setSelectedCourseFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
        >
          <option value="all">All Registered Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} - {c.name.split(' ')[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Deliverables List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourse(item.course.id)}
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 hover:underline"
                  >
                    {item.course.code}
                  </button>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.category} • Weight: {item.weightPercent || 5}%
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'graded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {item.instructions}
                </p>

                {item.feedback && (
                  <p className="text-xs text-blue-900 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                    <span className="font-bold">Faculty Feedback: </span>
                    {item.feedback}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:items-end gap-2 flex-shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block">
                    Due: {item.dueDate} at {item.dueTime}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {item.status === 'graded'
                      ? `${item.score} / ${item.points} pts (${Math.round(
                          ((item.score || 0) / item.points) * 100
                        )}%)`
                      : `${item.points} pts possible`}
                  </span>
                </div>

                <button
                  onClick={() => onOpenAssignmentSubmit(item, item.course)}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {item.status === 'graded' || item.status === 'submitted'
                      ? 'Review Submission'
                      : 'Submit Deliverable'}
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-500">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No deliverables found</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or status filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

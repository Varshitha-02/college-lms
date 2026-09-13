import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  FileText,
  Video,
  Download,
  Filter,
} from 'lucide-react';
import { CalendarEvent, Course } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  courses,
  onSelectCourse,
}) => {
  const [selectedDay, setSelectedDay] = useState('2026-09-14'); // Monday
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const daysOfWeek = [
    { label: 'Mon', date: '2026-09-14', dayNum: '14' },
    { label: 'Tue', date: '2026-09-15', dayNum: '15' },
    { label: 'Wed', date: '2026-09-16', dayNum: '16' },
    { label: 'Thu', date: '2026-09-17', dayNum: '17' },
    { label: 'Fri', date: '2026-09-18', dayNum: '18' },
    { label: 'Sat', date: '2026-09-19', dayNum: '19' },
    { label: 'Sun', date: '2026-09-20', dayNum: '20' },
  ];

  const currentDayEvents = events.filter((e) => e.date === selectedDay);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Collegiate Schedule & Academic Timetable
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
              September 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Lectures, laboratory sections, problem set due times, and faculty office hours
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 text-xs font-bold ${
                viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Weekly Agenda
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 text-xs font-bold ${
                viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Monthly Grid
            </button>
          </div>

          <button
            onClick={() => alert('Calendar synced with collegiate timetable!')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Sync iCal</span>
          </button>
        </div>
      </div>

      {/* Week Selector Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDay === day.date;
            const hasEvents = events.some((e) => e.date === day.date);

            return (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day.date)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span
                  className={`text-[11px] font-bold uppercase ${
                    isSelected ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {day.label}
                </span>
                <span className="text-lg font-mono font-bold mt-1">
                  {day.dayNum}
                </span>
                {hasEvents && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                      isSelected ? 'bg-white' : 'bg-blue-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Events Agenda View */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Schedule for {new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </h3>
            <p className="text-xs text-slate-500">
              {currentDayEvents.length} scheduled academic events
            </p>
          </div>
        </div>

        {currentDayEvents.length > 0 ? (
          <div className="space-y-3">
            {currentDayEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1.5 self-stretch rounded-full flex-shrink-0"
                    style={{ backgroundColor: evt.courseColor }}
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-800">
                        {evt.courseCode}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          evt.type === 'class'
                            ? 'bg-blue-100 text-blue-800'
                            : evt.type === 'assignment'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {evt.type.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {evt.time}
                      </span>
                      {evt.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {evt.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {evt.courseCode && (
                  <button
                    onClick={() => {
                      const c = courses.find((x) => x.code === evt.courseCode);
                      if (c) onSelectCourse(c.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors self-start md:self-auto"
                  >
                    Open Course
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <CalendarIcon className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No scheduled events</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Enjoy your study break or research reading session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

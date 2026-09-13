import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { Course, UserProfile } from '../types';

interface GradesViewProps {
  courses: Course[];
  currentUser: UserProfile;
  onSelectCourse: (courseId: string) => void;
}

export const GradesView: React.FC<GradesViewProps> = ({
  courses,
  currentUser,
  onSelectCourse,
}) => {
  const [targetGPA, setTargetGPA] = useState<number>(3.9);

  // Past term historical records
  const pastTerms = [
    {
      term: 'Spring 2026',
      termGPA: 3.92,
      credits: 16.0,
      standing: "Dean's Honors",
      courses: [
        { code: 'CS 210', name: 'Computer Systems & Architecture', credits: 4.0, grade: 'A', score: 95.2 },
        { code: 'CS 201', name: 'Discrete Mathematical Structures', credits: 4.0, grade: 'A', score: 94.0 },
        { code: 'PHYS 150', name: 'University Physics II: Electromagnetism', credits: 4.0, grade: 'A-', score: 91.5 },
        { code: 'PHIL 105', name: 'Epistemology & Logic', credits: 4.0, grade: 'A', score: 96.0 },
      ],
    },
    {
      term: 'Fall 2025',
      termGPA: 3.84,
      credits: 16.0,
      standing: "Dean's Honors",
      courses: [
        { code: 'CS 106B', name: 'Programming Abstractions in C++', credits: 4.0, grade: 'A', score: 96.5 },
        { code: 'MATH 120', name: 'Single Variable Calculus II', credits: 4.0, grade: 'A-', score: 90.8 },
        { code: 'CHEM 140', name: 'Organic Chemistry I', credits: 4.0, grade: 'B+', score: 88.2 },
        { code: 'PWR 1', name: 'Writing & Rhetoric Seminar', credits: 4.0, grade: 'A', score: 94.0 },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Official Academic Record & Gradebook
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Office of the Registrar • Bachelor of Science Degree Candidate
          </p>
        </div>

        <button
          onClick={() => alert('Official Grade Audit report generated for download.')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Academic Audit PDF</span>
        </button>
      </div>

      {/* Academic Highlights 4-Col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Cumulative GPA
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-extrabold text-slate-900">
              {currentUser.gpa?.toFixed(2) || '3.88'}
            </span>
            <span className="text-xs font-bold text-emerald-600">/ 4.00</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Top 5% of Graduating Class</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Major GPA
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-extrabold text-blue-700">
              3.94
            </span>
            <span className="text-xs font-bold text-blue-600">/ 4.00</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Computer Science Major Courses</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Degree Credits
            </span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-extrabold text-slate-900">
              {currentUser.cumulativeCredits}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 120.0 Required</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{
                width: `${Math.round(((currentUser.cumulativeCredits || 92) / 120) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Honors Standing
            </span>
            <GraduationCap className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-sm font-bold text-slate-900 block mt-1">
            {currentUser.academicStanding || "Dean's First Honors"}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Summa Cum Laude Candidate</p>
        </div>
      </div>

      {/* Current Term: Fall 2026 In-Progress */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              Fall 2026 Academic Term (In-Progress)
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              CURRENT
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">
            Term Credits: 16.0
          </span>
        </div>

        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
              <th className="py-2.5 px-4 font-bold">Course</th>
              <th className="py-2.5 px-4 font-bold">Department</th>
              <th className="py-2.5 px-4 font-bold">Credits</th>
              <th className="py-2.5 px-4 font-bold text-right">Score</th>
              <th className="py-2.5 px-4 font-bold text-right">Grade</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{course.name}</div>
                  <span className="font-mono text-blue-600 font-bold">
                    {course.code}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{course.department}</td>
                <td className="py-3 px-4 font-mono text-slate-600">
                  {course.credits.toFixed(1)}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">
                  {course.currentScore}%
                </td>
                <td className="py-3 px-4 text-right font-mono font-extrabold text-blue-700">
                  {course.letterGrade}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onSelectCourse(course.id)}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Historical Terms Breakdown */}
      {pastTerms.map((termRecord, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
        >
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {termRecord.term} Term
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                COMPLETED
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-500">
                Credits: <span className="font-mono font-bold text-slate-800">{termRecord.credits}</span>
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Term GPA: {termRecord.termGPA}
              </span>
            </div>
          </div>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                <th className="py-2.5 px-4 font-bold">Course</th>
                <th className="py-2.5 px-4 font-bold">Credits</th>
                <th className="py-2.5 px-4 font-bold text-right">Final Score</th>
                <th className="py-2.5 px-4 font-bold text-right">Letter Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {termRecord.courses.map((c, cIdx) => (
                <tr key={cIdx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-slate-800 mr-2">{c.code}</span>
                    <span className="text-slate-600">{c.name}</span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">
                    {c.credits.toFixed(1)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                    {c.score}%
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                    {c.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

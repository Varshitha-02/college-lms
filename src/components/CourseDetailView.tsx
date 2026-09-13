import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Mail,
  User,
  CheckCircle2,
  Circle,
  FileText,
  Video,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Upload,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Award,
  Calculator,
  Plus,
  ThumbsUp,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';
import { Course, Assignment, UserProfile } from '../types';

interface CourseDetailViewProps {
  course: Course;
  currentUser: UserProfile;
  onBack: () => void;
  onOpenAssignmentSubmit: (assignment: Assignment, course: Course) => void;
  onTakeQuiz: (quiz: any) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  currentUser,
  onBack,
  onOpenAssignmentSubmit,
  onTakeQuiz,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'modules' | 'assignments' | 'grades' | 'syllabus' | 'discussions' | 'quizzes'
  >('modules');

  // Interactive What-If grade state
  const [whatIfScores, setWhatIfScores] = useState<Record<string, number>>({});
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true,
    'mod-3': true,
    'mod-4': true,
  });

  // Discussions state
  const [discussionList, setDiscussionList] = useState(course.discussions);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate What-If simulated course percentage
  const calculateSimulatedScore = () => {
    let totalWeight = 0;
    let earnedWeight = 0;

    course.assignments.forEach((assignment) => {
      const weight = assignment.weightPercent || 5;
      totalWeight += weight;

      if (assignment.status === 'graded' && assignment.score !== undefined) {
        earnedWeight += (assignment.score / assignment.points) * weight;
      } else if (whatIfScores[assignment.id] !== undefined) {
        earnedWeight += (whatIfScores[assignment.id] / assignment.points) * weight;
      } else {
        // Assume default 90% if not entered
        earnedWeight += 0.9 * weight;
      }
    });

    if (totalWeight === 0) return course.currentScore;
    return Math.min(100, Number(((earnedWeight / totalWeight) * 100).toFixed(1)));
  };

  const simulatedScore = calculateSimulatedScore();
  const getLetterGrade = (score: number) => {
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    return 'C';
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

    const newThread = {
      id: `disc-${Date.now()}`,
      title: newQuestionTitle,
      authorName: currentUser.name,
      authorRole: currentUser.role as any,
      authorAvatar: currentUser.avatarUrl,
      category: 'Homework Q&A' as const,
      postedAt: 'Just now',
      repliesCount: 0,
      views: 1,
      content: newQuestionContent,
      replies: [],
    };

    setDiscussionList([newThread, ...discussionList]);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    setShowQuestionModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Back to courses button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Courses</span>
      </button>

      {/* Course Hero Header with Hotlinked Academic Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
        <div className="relative h-48 md:h-56 w-full">
          <img
            src={course.coverImage}
            alt={course.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />

          {/* Overlaid Course Info */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                  {course.code}
                </span>
                <span className="text-xs bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/20">
                  {course.term} • {course.credits} Credits
                </span>
                <span className="text-xs bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/20">
                  {course.department}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                {course.name}
              </h1>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-4">
                <span>{course.schedule.days} • {course.schedule.time}</span>
                <span>• {course.schedule.location}</span>
              </p>
            </div>

            {/* Current Standing Pill */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 self-start md:self-auto">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Course Grade
                </p>
                <p className="text-lg font-mono font-extrabold text-white">
                  {course.currentScore}% ({course.letterGrade})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={course.instructor.avatarUrl}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-bold text-slate-900 text-sm">
                {course.instructor.name}
              </p>
              <p className="text-slate-500 text-xs">{course.instructor.title}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.instructor.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Office Hours: {course.instructor.officeHours}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.instructor.office}</span>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex border-t border-slate-200 px-6 bg-white overflow-x-auto">
          {[
            { id: 'modules', label: 'Modules & Content', count: course.modules.length },
            { id: 'assignments', label: 'Assignments', count: course.assignments.length },
            { id: 'grades', label: 'Grades & What-If', count: null },
            { id: 'syllabus', label: 'Syllabus', count: null },
            { id: 'discussions', label: 'Discussions & Q&A', count: discussionList.length },
            { id: 'quizzes', label: 'Quizzes & Tests', count: course.quizzes.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeSubTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeSubTab === tab.id
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Tab 1: Modules */}
      {activeSubTab === 'modules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Curriculum Units & Weekly Modules
            </h3>
            <span className="text-xs text-slate-500">
              {course.modules.length} Modules Published
            </span>
          </div>

          {course.modules.length > 0 ? (
            course.modules.map((module) => {
              const isExpanded = !!expandedModules[module.id];
              return (
                <div
                  key={module.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                      <div>
                        <span className="text-xs font-bold text-blue-600 mr-2">
                          {module.week}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {module.title}
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {module.items.length} items
                    </span>
                  </button>

                  {/* Module Items */}
                  {isExpanded && (
                    <div className="divide-y divide-slate-100 p-2">
                      {module.items.map((item) => {
                        const isCompleted = item.completed;
                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50/80 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                              )}

                              <div className="flex items-center gap-2">
                                {item.type === 'lecture' && (
                                  <Video className="w-4 h-4 text-blue-500" />
                                )}
                                {item.type === 'reading' && (
                                  <BookOpen className="w-4 h-4 text-amber-500" />
                                )}
                                {item.type === 'assignment' && (
                                  <FileText className="w-4 h-4 text-indigo-500" />
                                )}
                                {item.type === 'quiz' && (
                                  <HelpCircle className="w-4 h-4 text-rose-500" />
                                )}
                                {item.type === 'external_link' && (
                                  <ExternalLink className="w-4 h-4 text-teal-500" />
                                )}
                                <span className="text-xs font-medium text-slate-800">
                                  {item.title}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {item.durationOrPages && (
                                <span className="text-[11px] font-mono text-slate-400">
                                  {item.durationOrPages}
                                </span>
                              )}
                              {item.assignmentId && (
                                <button
                                  onClick={() => {
                                    const asg = course.assignments.find(
                                      (a) => a.id === item.assignmentId
                                    );
                                    if (asg) onOpenAssignmentSubmit(asg, course);
                                  }}
                                  className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded hover:bg-blue-100 transition-colors"
                                >
                                  {isCompleted ? 'View Submission' : 'Submit'}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No modules published yet</p>
              <p className="text-xs text-slate-400 mt-1">
                The instructor will upload syllabus lectures and weekly packets soon.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Assignments */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Course Deliverables & Problem Sets
              </h3>
              <p className="text-xs text-slate-500">
                Grade-weighted submissions and laboratory reports
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
            {course.assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        assignment.status === 'graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : assignment.status === 'submitted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {assignment.status.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {assignment.category} • Weight: {assignment.weightPercent}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {assignment.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {assignment.instructions}
                  </p>

                  {assignment.feedback && (
                    <div className="mt-2 p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
                      <span className="font-bold">Faculty Feedback: </span>
                      {assignment.feedback}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block">
                      Due: {assignment.dueDate} at {assignment.dueTime}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {assignment.status === 'graded'
                        ? `${assignment.score} / ${assignment.points} pts (${Math.round(
                            ((assignment.score || 0) / assignment.points) * 100
                          )}%)`
                        : `${assignment.points} Points Possible`}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenAssignmentSubmit(assignment, course)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {assignment.status === 'graded' || assignment.status === 'submitted'
                        ? 'View Submission'
                        : 'Submit Assignment'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Grades & What-If Calculator */}
      {activeSubTab === 'grades' && (
        <div className="space-y-6">
          {/* Simulated Score Card */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm border border-blue-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Interactive What-If Grade Projector
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Projected Course Standing
                </h3>
                <p className="text-xs text-slate-300 max-w-xl mt-1">
                  Simulate your hypothetical test and homework scores below to calculate
                  your projected final course grade and GPA letter mark!
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-blue-200 block">
                    Simulated Grade
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-white">
                    {simulatedScore}%
                  </span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/30 flex items-center justify-center border border-blue-400/40 text-xl font-mono font-extrabold text-emerald-300">
                  {getLetterGrade(simulatedScore)}
                </div>
              </div>
            </div>
          </div>

          {/* Grade Items Table with Interactive Inputs */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Gradebook & Deliverables Ledger
                </h4>
                <p className="text-xs text-slate-500">
                  Click into any pending score box to test a hypothetical grade
                </p>
              </div>
              <button
                onClick={() => setWhatIfScores({})}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset What-If
              </button>
            </div>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-600 font-bold">
                  <th className="py-3 px-4">Deliverable</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Category Weight</th>
                  <th className="py-3 px-4 text-right">Score</th>
                  <th className="py-3 px-4 text-right">What-If Test</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {course.assignments.map((asg) => {
                  const isGraded = asg.status === 'graded';
                  const currentSimVal = whatIfScores[asg.id];

                  return (
                    <tr key={asg.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{asg.title}</span>
                        <span className="text-[11px] text-slate-500">{asg.category}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{asg.dueDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isGraded
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {asg.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {asg.weightPercent || 5}%
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold">
                        {isGraded ? (
                          <span className="text-emerald-700">
                            {asg.score} / {asg.points}
                          </span>
                        ) : (
                          <span className="text-slate-400">- / {asg.points}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isGraded ? (
                          <span className="text-slate-400 font-mono">Final</span>
                        ) : (
                          <div className="inline-flex items-center gap-1 justify-end">
                            <input
                              type="number"
                              min="0"
                              max={asg.points}
                              placeholder={`${asg.points}`}
                              value={currentSimVal !== undefined ? currentSimVal : ''}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setWhatIfScores((prev) => ({
                                  ...prev,
                                  [asg.id]: isNaN(val) ? asg.points : val,
                                }));
                              }}
                              className="w-16 px-2 py-1 text-right text-xs font-mono font-bold border border-blue-300 rounded bg-blue-50/50 text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <span className="text-slate-400 font-mono">/ {asg.points}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Grade Weights Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              Syllabus Grading Weight Distribution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {course.syllabus.gradeWeights.map((gw, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-600 block">
                    {gw.category}
                  </span>
                  <span className="text-lg font-mono font-extrabold text-blue-700">
                    {gw.weight}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Syllabus */}
      {activeSubTab === 'syllabus' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Official Course Syllabus
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {course.code}: {course.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Term: {course.term} • Department of {course.department}
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Course Overview</h4>
              <p>{course.syllabus.overview}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Prerequisites</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {course.syllabus.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Required Textbooks</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {course.syllabus.textbooks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Collegiate Academic Integrity & Honor Code</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All submitted work must be original. Collaboration on problem sets is
                encouraged during whiteboard brainstorming, but all final proofs and code
                must be written individually. Any unauthorized generative plagiarism is
                subject to university disciplinary review.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 5: Discussions */}
      {activeSubTab === 'discussions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Classroom Q&A & Discussion Board
              </h3>
              <p className="text-xs text-slate-500">
                Ask questions, share insights, and view professor endorsed responses
              </p>
            </div>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </div>

          {/* New Question Composer Modal */}
          {showQuestionModal && (
            <form
              onSubmit={handlePostDiscussion}
              className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-md space-y-3"
            >
              <h4 className="text-sm font-bold text-slate-900">
                New Discussion Topic
              </h4>
              <input
                type="text"
                placeholder="Question title (e.g. Question regarding Problem Set 4)"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Provide context, formulas, or code snippets..."
                value={newQuestionContent}
                onChange={(e) => setNewQuestionContent(e.target.value)}
                rows={3}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Publish Question
                </button>
              </div>
            </form>
          )}

          {/* Discussion Threads List */}
          <div className="space-y-3">
            {discussionList.map((thread) => (
              <div
                key={thread.id}
                className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {thread.pinned && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        PINNED
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {thread.category}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {thread.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{thread.postedAt}</span>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={thread.authorAvatar}
                    alt={thread.authorName}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {thread.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        ({thread.authorRole})
                      </span>
                    </div>
                    <p className="leading-relaxed">{thread.content}</p>
                  </div>
                </div>

                {/* Replies */}
                {thread.replies.length > 0 && (
                  <div className="pl-6 pt-3 border-t border-slate-100 space-y-3">
                    {thread.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <img
                          src={reply.authorAvatar}
                          alt={reply.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 text-xs text-slate-700 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">
                                {reply.authorName}
                              </span>
                              {reply.isEndorsed && (
                                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  Instructor Endorsed
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {reply.postedAt}
                            </span>
                          </div>
                          <p className="leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 6: Quizzes */}
      {activeSubTab === 'quizzes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Quizzes & Diagnostic Assessments
              </h3>
              <p className="text-xs text-slate-500">
                Self-evaluations and timed chapter check-ins
              </p>
            </div>
          </div>

          {course.quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        TIMED QUIZ
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {quiz.timeLimitMinutes} Minutes
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{quiz.title}</h4>
                    <p className="text-xs text-slate-500">{quiz.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {quiz.totalPoints} Points Possible
                    </span>
                    <button
                      onClick={() => onTakeQuiz(quiz)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                    >
                      {quiz.completed ? 'Review Answers' : 'Begin Assessment'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No active quizzes</p>
              <p className="text-xs text-slate-400 mt-1">
                Any upcoming midterm check-ins will be scheduled here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

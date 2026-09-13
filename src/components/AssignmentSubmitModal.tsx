import React, { useState } from 'react';
import {
  X,
  Upload,
  FileCheck,
  AlertCircle,
  File,
  CheckCircle,
  Clock,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { Assignment, Course } from '../types';

interface AssignmentSubmitModalProps {
  assignment: Assignment;
  course: Course;
  onClose: () => void;
  onSubmitSuccess: (assignmentId: string, fileName: string) => void;
}

export const AssignmentSubmitModal: React.FC<AssignmentSubmitModalProps> = ({
  assignment,
  course,
  onClose,
  onSubmitSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mockFileName, setMockFileName] = useState<string>(
    assignment.submittedFile || 'Alex_Rivera_PS4_Submission.pdf'
  );
  const [comments, setComments] = useState('');
  const [honorPledge, setHonorPledge] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(
    assignment.status === 'submitted' || assignment.status === 'graded'
  );

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setMockFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setMockFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockFileName || !honorPledge) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      onSubmitSuccess(assignment.id, mockFileName);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {course.code}
              </span>
              <span className="text-xs text-slate-500">{course.name}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {assignment.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          {/* Metadata Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">Due Date</span>
              <span className="font-bold text-slate-800">
                {assignment.dueDate} at {assignment.dueTime}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Points Available</span>
              <span className="font-bold text-slate-800">
                {assignment.points} Points
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Submission Format</span>
              <span className="font-bold text-slate-800">
                {assignment.allowedSubmissions || 'PDF Document'}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Instructions</h4>
            <p className="leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100">
              {assignment.instructions}
            </p>
          </div>

          {/* Rubric Preview if available */}
          {assignment.rubric && assignment.rubric.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Evaluation Rubric</h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                {assignment.rubric.map((r, i) => (
                  <div key={i} className="p-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {r.criterion}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {r.description}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-blue-700">
                      {r.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload or Submitted Status */}
          {hasSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Deliverable Submitted Successfully</span>
              </div>
              <p className="text-emerald-700 text-xs">
                File: <span className="font-mono font-bold">{mockFileName}</span>
              </p>
              {assignment.status === 'graded' && (
                <div className="pt-2 border-t border-emerald-200">
                  <p className="font-bold text-emerald-900">
                    Grade: {assignment.score} / {assignment.points} points
                  </p>
                  {assignment.feedback && (
                    <p className="mt-1 text-slate-700 italic">
                      "{assignment.feedback}"
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Drag & Drop Box */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Upload Deliverable
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-50 hover:bg-blue-50/20 transition-all cursor-pointer relative"
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">
                    {mockFileName ? mockFileName : 'Drag and drop your file here, or browse'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Accepts PDF, DOCX, ZIP, or Jupyter Notebooks (Max 50MB)
                  </p>
                </div>
              </div>

              {/* Student Comments */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Comments for Grader / TA (Optional)
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="e.g. Question 3 contains my alternative proof using induction..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Honor Code Pledge */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="honor-pledge"
                  checked={honorPledge}
                  onChange={(e) => setHonorPledge(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label
                  htmlFor="honor-pledge"
                  className="text-[11px] text-slate-600 leading-tight"
                >
                  <span className="font-bold text-slate-800">Collegiate Honor Pledge: </span>
                  I affirm on my honor that I have complied with the academic integrity
                  regulations of the university. This work is entirely my own.
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !honorPledge}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors disabled:opacity-50 flex items-center gap-2 shadow-xs"
                >
                  {isSubmitting ? (
                    <span>Submitting to Server...</span>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>Submit Assignment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

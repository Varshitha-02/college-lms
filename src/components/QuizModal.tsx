import React, { useState } from 'react';
import { X, CheckCircle, HelpCircle, AlertCircle, Award } from 'lucide-react';
import { Quiz } from '../types';

interface QuizModalProps {
  quiz: Quiz;
  onClose: () => void;
  onComplete: (quizId: string, score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  quiz,
  onClose,
  onComplete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let earned = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        earned += q.points;
      }
    });
    setScore(earned);
    setSubmitted(true);
    onComplete(quiz.id, earned);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
              Online Assessment
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{quiz.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-slate-800">
          {submitted && score !== null && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-950 text-sm">
                  Assessment Completed!
                </p>
                <p className="text-blue-700 text-xs">
                  Your results have been recorded in the course gradebook.
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-blue-600 block font-bold">Your Score</span>
                <span className="text-xl font-extrabold text-blue-900">
                  {score} / {quiz.totalPoints} pts
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {quiz.questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = submitted && userAnswer === q.correctOptionIndex;
              const isIncorrect = submitted && userAnswer !== undefined && !isCorrect;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border ${
                    submitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : isIncorrect
                        ? 'border-red-300 bg-red-50/40'
                        : 'border-slate-200 bg-white'
                      : 'border-slate-200 bg-slate-50/50'
                  } space-y-3`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-slate-900 text-xs leading-relaxed">
                      {qIndex + 1}. {q.question}
                    </h4>
                    <span className="font-mono text-slate-400 font-bold flex-shrink-0">
                      {q.points} pts
                    </span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = userAnswer === optIndex;
                      return (
                        <label
                          key={optIndex}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 font-bold text-blue-900'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={isSelected}
                            onChange={() => handleSelect(q.id, optIndex)}
                            disabled={submitted}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold"
              >
                {submitted ? 'Close' : 'Cancel'}
              </button>
              {!submitted && (
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

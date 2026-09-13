import React, { useState } from 'react';
import {
  BookmarkCheck,
  BookOpen,
  Search,
  ExternalLink,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  Calendar,
  Building,
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const [roomBooked, setRoomBooked] = useState(false);
  const [tutoringBooked, setTutoringBooked] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Collegiate Academic Services & Library Commons
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Research repositories, quiet study carrels, writing center appointments, and university software catalogs
        </p>
      </div>

      {/* Library Research Repositories */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Institutional Research Databases (Full Proxy Access)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Authenticated via LearnPool SSO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'ACM Digital Library',
              desc: 'Full-text collection of all ACM publications, conference proceedings, and computing literature.',
              tag: 'Computer Science',
            },
            {
              name: 'IEEE Xplore Digital Library',
              desc: 'Scientific and technical content in electrical engineering, computer science, and electronics.',
              tag: 'Engineering',
            },
            {
              name: 'JSTOR & ScienceDirect',
              desc: 'Over 12 million academic journal articles, books, and primary sources in 75 disciplines.',
              tag: 'Multidisciplinary',
            },
          ].map((db, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {db.tag}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1.5">{db.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {db.desc}
                </p>
              </div>
              <button
                onClick={() => alert(`Launching authenticated institutional session for ${db.name}...`)}
                className="mt-3 flex items-center justify-between w-full text-xs font-bold text-blue-600 hover:text-blue-700 pt-2 border-t border-slate-200"
              >
                <span>Launch Search Gateway</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Booking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Study Room */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Reserve a Library Collaboration Room
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Equipped with 65-inch 4K collaborative displays, glass markerboards, and conference webcams.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Sterling Memorial • Room 304</p>
                <p className="text-slate-500 text-[11px]">Capacity: 6 Students • Whiteboard & HDMI</p>
              </div>
              <span className="font-mono text-emerald-600 font-bold">Available Today</span>
            </div>
          </div>

          <button
            onClick={() => setRoomBooked(!roomBooked)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
              roomBooked
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {roomBooked ? 'Room Reserved: 4:00 PM - 6:00 PM' : 'Reserve Room for Today 4:00 PM'}
          </button>
        </div>

        {/* Writing Center Appointment */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Collegiate Writing & Capstone Coaching
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            One-on-one consultations with faculty writing fellows on thesis drafting, citations, and rhetoric.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Whitman Hall Writing Studio</p>
                <p className="text-slate-500 text-[11px]">Consultant: Dr. Marcus Sterling • 45 min session</p>
              </div>
              <span className="font-mono text-blue-600 font-bold">Tomorrow 2:00 PM</span>
            </div>
          </div>

          <button
            onClick={() => setTutoringBooked(!tutoringBooked)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
              tutoringBooked
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {tutoringBooked ? 'Appointment Confirmed!' : 'Book 1-on-1 Consultation'}
          </button>
        </div>
      </div>
    </div>
  );
};

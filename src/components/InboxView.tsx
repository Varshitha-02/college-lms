import React, { useState } from 'react';
import {
  Inbox as InboxIcon,
  Send,
  User,
  Paperclip,
  CheckCircle2,
  Clock,
  Search,
} from 'lucide-react';
import { MessageThread, UserProfile } from '../types';

interface InboxViewProps {
  threads: MessageThread[];
  currentUser: UserProfile;
}

export const InboxView: React.FC<InboxViewProps> = ({
  threads: initialThreads,
  currentUser,
}) => {
  const [threads, setThreads] = useState(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState(initialThreads[0]?.id || '');
  const [replyText, setReplyText] = useState('');

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedThread) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      sender: currentUser.name,
      avatar: currentUser.avatarUrl,
      isMe: true,
      text: replyText,
      time: 'Just now',
    };

    const updatedThreads = threads.map((t) => {
      if (t.id === selectedThread.id) {
        return {
          ...t,
          lastMessage: replyText,
          timestamp: 'Just now',
          messages: [...t.messages, newMessage],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setReplyText('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 h-[calc(100vh-5rem)] flex flex-col">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Collegiate Communications & Advising Inbox
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Official academic correspondence with course instructors, teaching assistants, and university advisors
        </p>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col md:flex-row min-h-0">
        {/* Left Threads Column */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-3 border-b border-slate-200 bg-white">
            <span className="text-xs font-bold text-slate-700">
              Active Conversations ({threads.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {threads.map((thread) => {
              const isSelected = selectedThreadId === thread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 ${
                    isSelected
                      ? 'bg-blue-50/70 border-l-4 border-blue-600'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <img
                    src={thread.senderAvatar}
                    alt={thread.senderName}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {thread.senderName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {thread.timestamp}
                      </span>
                    </div>
                    {thread.courseCode && (
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-100/60 px-1 rounded mr-1">
                        {thread.courseCode}
                      </span>
                    )}
                    <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                      {thread.subject}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {thread.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Conversation */}
        {selectedThread ? (
          <div className="flex-1 flex flex-col h-full bg-white">
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <img
                  src={selectedThread.senderAvatar}
                  alt={selectedThread.senderName}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {selectedThread.subject}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Between you and {selectedThread.senderName} ({selectedThread.senderRole})
                  </p>
                </div>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedThread.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${
                    m.isMe ? 'flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={m.avatar}
                    alt={m.sender}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.isMe
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-bold text-[11px] opacity-90">
                        {m.sender}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono">
                        {m.time}
                      </span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Composer */}
            <form
              onSubmit={handleSendReply}
              className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official academic response..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-slate-400">
            <p className="text-sm">Select a thread to view conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

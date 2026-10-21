import React, { useState, useEffect } from 'react';
import { KindnessNote } from '../types';
import { soundscape } from '../utils/audio';
import { X, Send, RefreshCw, Heart } from 'lucide-react';

interface KindnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: KindnessNote[];
  onAddNote: (note: KindnessNote) => void;
}

/**
 * KindnessModal component
 * Community kindness note drawer with drawing and sharing capabilities.
 * Accessible with Escape key listener and backdrop click.
 */
export const KindnessModal: React.FC<KindnessModalProps> = ({
  isOpen,
  onClose,
  notes,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'take' | 'leave'>('take');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  // Form state
  const [noteText, setNoteText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Keyboard accessibility: Escape to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentNote = notes[currentNoteIndex % notes.length];

  const handleNextNote = () => {
    soundscape.playSoftChime(659.25);
    setCurrentNoteIndex((prev) => (prev + 1) % notes.length);
  };

  const handleRandomNote = () => {
    soundscape.playSoftChime(783.99);
    const randomIndex = Math.floor(Math.random() * notes.length);
    setCurrentNoteIndex(randomIndex);
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    soundscape.playSoftChime(880);
    const newNote: KindnessNote = {
      id: `user-${Date.now()}`,
      text: noteText.trim(),
      author: authorName.trim() || 'A fellow traveler',
      date: 'Just now',
      stamp: 'Shared Heart',
      isUserCreated: true,
    };

    onAddNote(newNote);
    setSubmitted(true);
    setNoteText('');
    setAuthorName('');

    setTimeout(() => {
      setSubmitted(false);
      setActiveTab('take');
      setCurrentNoteIndex(notes.length); // point to new note
    }, 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2825]/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#FAF6EF] border border-[#2C2825]/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#2C2825] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C4A2F] font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>The Kindness Jar</span>
          </div>
          <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-medium text-[#2C2825]">
            Take what you need, leave what you can.
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-[#EFE7DC] rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('take')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'take'
                ? 'bg-[#FAF6EF] text-[#2C2825] shadow-xs'
                : 'text-[#73685F] hover:text-[#2C2825]'
            }`}
          >
            Draw a Thought
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'leave'
                ? 'bg-[#FAF6EF] text-[#2C2825] shadow-xs'
                : 'text-[#73685F] hover:text-[#2C2825]'
            }`}
          >
            Leave a Little Kindness
          </button>
        </div>

        {/* Tab Content: Draw Note */}
        {activeTab === 'take' && currentNote && (
          <div className="space-y-6">
            <div className="relative p-6 sm:p-8 bg-[#FFFBF4] border border-[#8C4A2F]/20 rounded-2xl shadow-xs">
              {/* Paper Stamp */}
              <div className="inline-block px-2.5 py-1 bg-[#8C4A2F]/10 border border-[#8C4A2F]/25 text-[11px] font-semibold text-[#8C4A2F] rounded uppercase tracking-wider mb-4">
                {currentNote.stamp || 'Gentle Reminder'}
              </div>

              <p className="font-handwriting text-2xl sm:text-3xl text-[#2C2825] leading-relaxed mb-6">
                “{currentNote.text}”
              </p>

              <div className="flex items-center justify-between text-xs text-[#7A6E63] border-t border-[#2C2825]/8 pt-3">
                <span className="font-medium">— {currentNote.author}</span>
                <span>{currentNote.date}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleRandomNote}
                className="px-4 py-2.5 border border-[#2C2825]/15 text-[#2C2825] hover:bg-[#EFE7DC] text-xs font-medium rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle note</span>
              </button>

              <button
                onClick={handleNextNote}
                className="px-5 py-2.5 bg-[#8C4A2F] hover:bg-[#723922] text-[#FAF6EF] text-xs font-medium rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Another note</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Leave a Note */}
        {activeTab === 'leave' && (
          <div>
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <h4 className="font-serif text-xl font-medium text-[#2C2825]">
                  Thank you for leaving kindness behind.
                </h4>
                <p className="text-xs text-[#7A6E63] max-w-sm mx-auto">
                  Your note has been placed into the jar for the next person who walks through.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitNote} className="space-y-4">
                <div>
                  <label htmlFor="kindness-text" className="block text-xs font-medium text-[#2C2825] mb-1.5">
                    What is a gentle sentence someone might need to hear today?
                  </label>
                  <textarea
                    id="kindness-text"
                    required
                    maxLength={280}
                    rows={4}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="e.g. You don't have to carry the whole mountain today. One step is enough."
                    className="w-full p-4 rounded-xl border border-[#2C2825]/15 bg-white text-sm text-[#2C2825] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C4A2F]/30"
                  />
                  <div className="flex justify-end text-[11px] text-[#A8988B] mt-1">
                    {280 - noteText.length} characters left
                  </div>
                </div>

                <div>
                  <label htmlFor="author-name" className="block text-xs font-medium text-[#2C2825] mb-1.5">
                    How would you like to sign it? (Optional)
                  </label>
                  <input
                    id="author-name"
                    type="text"
                    maxLength={50}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Someone sipping mint tea, A neighbor in Chicago..."
                    className="w-full p-3 rounded-xl border border-[#2C2825]/15 bg-white text-sm text-[#2C2825] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C4A2F]/30"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#8C4A2F] hover:bg-[#723922] text-[#FAF6EF] text-xs font-medium rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Drop Note into the Jar</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

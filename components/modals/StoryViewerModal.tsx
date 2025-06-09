import React from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

interface Story {
  id: number;
  user: { name: string; avatar: string };
  background: string;
  isAddStory?: boolean;
}

interface StoryViewerModalProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const reactions = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😆', label: 'Haha' },
  { emoji: '😮', label: 'Wow' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
];

const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ stories, currentIndex, onClose, onPrev, onNext }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    trackMouse: true,
  });

  const story = stories[currentIndex];
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="relative w-full max-w-md mx-4 bg-black rounded-xl shadow-xl flex flex-col items-center justify-center"
        {...handlers}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-800 rounded-full z-20"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Header: avatar, name, time */}
        <div className="flex items-center gap-3 absolute left-4 top-4 z-10">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
            <Image src={story.user.avatar} alt={story.user.name} width={40} height={40} className="object-cover" />
          </div>
          <div className="text-white">
            <div className="font-semibold text-base">{story.user.name}</div>
            <div className="text-xs opacity-80">8h ago</div>
          </div>
        </div>
        {/* Story image */}
        <div className="w-full h-[420px] flex items-center justify-center relative">
          <Image
            src={story.background}
            alt={story.user.name + "'s story"}
            fill
            style={{ objectFit: 'cover', borderRadius: '1rem' }}
            className="rounded-xl"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-10"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {currentIndex < stories.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-500/50 hover:bg-white/40 text-white rounded-full p-2 z-10"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {/* Reactions */}
        <div className="flex justify-center gap-2 mt-4 mb-2">
          {reactions.map(r => (
            <button key={r.label} className="text-2xl hover:scale-125 transition-transform" title={r.label}>{r.emoji}</button>
          ))}
        </div>
        {/* Reply input */}
        <div className="w-full px-4 pb-4">
          <input
            className="w-full rounded-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Reply..."
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewerModal; 
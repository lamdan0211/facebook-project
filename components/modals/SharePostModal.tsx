import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface SharePostModalProps {
  onClose: () => void;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  imageUrl?: string;
}

const SharePostModal: React.FC<SharePostModalProps> = ({
  onClose,
  author,
  content,
  imageUrl
}) => {
  const [shareText, setShareText] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('Public');
  const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // 👈 Thêm ref
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle share logic here
    console.log('Sharing post with text:', shareText);
    console.log('Selected audience:', selectedAudience);
    onClose();
  };

  const toggleAudienceDropdown = () => {
    setIsAudienceDropdownOpen(!isAudienceDropdownOpen);
  };

  const selectAudience = (audience: string) => {
    setSelectedAudience(audience);
    setIsAudienceDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="border-b border-b-[#dedede] px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Share post</h1>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Share Form */}
        <form onSubmit={handleShare}>
          <div className="p-4">
            {/* User Info and Audience Selector */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg"
                  alt="Your Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Your Name</p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleAudienceDropdown}
                    className="flex items-center space-x-1 text-sm bg-gray-100 px-3 py-1 rounded-md"
                  >
                    <span>{selectedAudience}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isAudienceDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => selectAudience('Public')}
                        >
                          🌍 Public
                        </button>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => selectAudience('Friends')}
                        >
                          👥 Friends
                        </button>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => selectAudience('Only me')}
                        >
                          🔒 Only me
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Share Text Input */}
            <div className="mb-4">
              <textarea
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-24 p-3 border border-[#dedede] rounded-lg resize-none focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Original Post Preview */}
            <div className="border border-[#dedede] rounded-lg p-3 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{author.name}</p>
                </div>
              </div>
              <p className="text-sm mb-2">{content}</p>
              {imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt="Post image"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Share Options */}
            <div className="flex items-center space-x-2 mb-4">
              <button
                type="button"
                className="flex items-center space-x-2 px-5 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <span className="text-base">👥</span>
                <span className="text-md whitespace-nowrap">Share to News Feed</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-2 px-5 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <span className="text-base">💬</span>
                <span className="text-md whitespace-nowrap">Share to Story</span>
              </button>
             
            </div>
          </div>

          {/* Share Button */}
          <div className="px-4 py-3">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Share now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SharePostModal; 
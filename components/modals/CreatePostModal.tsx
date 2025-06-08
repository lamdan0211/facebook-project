import React, { useState, useRef } from 'react';
import Image from 'next/image';
import TagPeopleModal from './TagPeopleModal';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('Only me');
  const [postContent, setPostContent] = useState('');
  const [isTagging, setIsTagging] = useState(false);
  const [taggedPeople, setTaggedPeople] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleAudienceDropdown = () => {
    setIsAudienceDropdownOpen(!isAudienceDropdownOpen);
    setShowEmojiPicker(false);
  };

  const selectAudience = (audience: string) => {
    setSelectedAudience(audience);
    setIsAudienceDropdownOpen(false);
  };

  const handleAddPhotoVideoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Selected files:', files);
      // Here you would typically handle the file upload
    }
  };

  const handlePostContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleTagPeopleClick = () => {
    setIsTagging(true);
  };

  const handleTaggingDone = (people: any[]) => {
    setTaggedPeople(people);
    setIsTagging(false);
    console.log('Tagged people:', people);
  };

  const handleCloseTagging = () => {
    setIsTagging(false);
  };

  const handleEmojiClick = (emojiData: any) => {
    setPostContent(prevContent => prevContent + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
    setIsAudienceDropdownOpen(false);
  };

  const handleFeelingActivityClick = () => {
    console.log('Feeling/Activity clicked');
    // Implement feeling/activity selection logic here
  };

  const handleCheckInClick = () => {
    console.log('Check In clicked');
    // Implement check-in logic here
  };

  const handleGifClick = () => {
    console.log('GIF clicked');
    // Implement GIF selection logic here
  };

  const handleMoreOptionsClick = () => {
    console.log('More Options clicked');
    // Implement more options logic here (e.g., Poll, Q&A)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation here
    console.log('Post content:', postContent);
    console.log('Selected audience:', selectedAudience);
    onClose();
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowEmojiPicker(false);
      setIsAudienceDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="relative border-b px-4 py-3">
          <h1 className="text-xl font-semibold text-center">Create post</h1>
          <button
            onClick={onClose}
            className="absolute right-4 top-3 p-1 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {/* User Info and Privacy Selector */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                <Image
                  src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg"
                  alt="Your Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">Lam Dan</p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleAudienceDropdown}
                    className="flex items-center space-x-1 text-xs bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    <span>🔒</span>
                    <span>{selectedAudience}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isAudienceDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10">
                      <div className="py-1">
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => selectAudience('Public')}
                        >
                          🌍 Public
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => selectAudience('Friends')}
                        >
                          👥 Friends
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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

            {/* Post Content Input */}
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind, Lam?"
              className="w-full min-h-[120px] text-lg resize-none border-0 focus:outline-none focus:ring-0 p-0"
            />

            {/* Add to Post Options */}
            <div className="flex items-center justify-between border rounded-lg px-3 py-1.5">
              <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Add to your post</span>
              <div className="flex items-center space-x-1.5">
                <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#45BD62" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B74E4" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full" onClick={toggleEmojiPicker}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EAB026" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F3425F" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <span className="text-base font-bold text-[#6CD2FF]">GIF</span>
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <span className="text-xl text-gray-500">•••</span>
                </button>
              </div>
            </div>

            {/* Emoji Picker Dropdown */}
            {showEmojiPicker && (
              <div className="absolute bottom-[180px] right-4 z-50" onClick={(e) => e.stopPropagation()}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Post Button */}
          <div className="p-4">
            <button
              type="submit"
              disabled={!postContent.trim()}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </form>

        {isTagging && <TagPeopleModal onClose={handleCloseTagging} onDone={handleTaggingDone} />}
      </div>
    </div>
  );
};

export default CreatePostModal;
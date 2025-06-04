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

  const handleEmojiIconClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      const newContent = postContent.substring(0, selectionStart) +
                         emojiData.emoji +
                         postContent.substring(selectionEnd);
      setPostContent(newContent);
      textarea.setSelectionRange(selectionStart + emojiData.emoji.length, selectionStart + emojiData.emoji.length);
      textarea.focus();
    }
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

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      console.log('Posting:', postContent);
      console.log('Tagged people for post:', taggedPeople);
      // Here you would send the postContent, taggedPeople, and potentially selected files/other data to your backend
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto relative">
        {/* Modal Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-center flex-grow">Create post</h2>
          <button className="p-2 rounded-full hover:bg-gray-200" onClick={onClose}>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image
              src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg"
              alt="User Avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Lam Dan</p>
            {/* Audience Dropdown Button */}
            <button
              className="flex items-center text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
              onClick={toggleAudienceDropdown}
            >
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              {selectedAudience}
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Audience Dropdown Content */}
            {isAudienceDropdownOpen && (
              <div className="absolute mt-1 w-40 bg-white rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => selectAudience('Public')}
                  >
                    Public
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => selectAudience('Friends')}
                  >
                    Friends
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => selectAudience('Only me')}
                  >
                    Only me
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Textarea for Post Content */}
        <div className="px-4 py-2 relative">
          <textarea
            className="w-full p-2 text-lg placeholder-gray-500 outline-none resize-none pr-10"
            placeholder="What's on your mind, Lam?"
            rows={4}
            value={postContent}
            onChange={handlePostContentChange}
            ref={textareaRef}
          ></textarea>
          <div className="absolute bottom-4 right-6 cursor-pointer" onClick={handleEmojiIconClick}>
             <svg className="w-5 h-5 text-gray-500 hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 100 2 1 1 0 000-2zm-.464 5.535a1 1 0 101.414 1.414S12.535 14 10 14s-2.95-.465-3.95-1.465a1 1 0 00-1.414 1.414S8.065 16 10 16s3.95-1.465 3.95-1.465z" clipRule="evenodd"></path></svg>
          </div>

          {showEmojiPicker && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {/* Add Photos/Videos Section */}
        <div className="p-4 border-t border-b mx-4 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={handleAddPhotoVideoClick}>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex justify-center items-center mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </div>
                </div>
                <p className="font-semibold text-gray-700">Add photos/videos</p>
                <p className="text-sm text-gray-500">or drag and drop</p>
            </div>
             {/* Add from Mobile */}
             <div className="flex items-center justify-between mt-4 bg-gray-100 p-3 rounded-md">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <span className="text-sm text-gray-700">Add photos and videos from your mobile device.</span>
                </div>
                <button className="text-blue-600 font-semibold text-sm">Add</button>
             </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Add to Post Icons */}
        <div className="p-4 flex items-center justify-between border-t mx-4">
          <p className="font-semibold text-gray-700">Add to your post</p>
          <div className="flex items-center space-x-4">
            {/* Photo/Video Icon (Click handled by the section above) */}
            <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-green-500">
               <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4V5l-4 4-4-4zm-3-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            </div>
            {/* Tag People Icon */}
            <svg className="w-6 h-6 text-blue-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={handleTagPeopleClick}><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            {/* Feeling/Activity Icon */}
            <svg className="w-6 h-6 text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={handleFeelingActivityClick}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 100 2 1 1 0 000-2zm-.464 5.535a1 1 0 101.414 1.414S12.535 14 10 14s-2.95-.465-3.95-1.465a1 1 0 00-1.414 1.414S8.065 16 10 16s3.95-1.465 3.95-1.465z" clipRule="evenodd"></path></svg>
            {/* Check In Icon */}
            <svg className="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={handleCheckInClick}><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            {/* GIF Icon */}
            <div className="w-6 h-6 text-gray-500 flex items-center justify-center cursor-pointer" onClick={handleGifClick}>GIF</div>
            {/* More Options Icon */}
            <svg className="w-6 h-6 text-gray-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={handleMoreOptionsClick}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.414V15a1 1 0 002 0v-4.586l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path></svg>
          </div>
        </div>

        {/* Post Button */}
        <div className="p-4">
          <button
            className={`w-full bg-blue-500 text-white py-2 rounded-md font-semibold ${postContent.trim() ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!postContent.trim()}
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>

        {isTagging && <TagPeopleModal onClose={handleCloseTagging} onDone={handleTaggingDone} />}
      </div>
    </div>
  );
};

export default CreatePostModal;
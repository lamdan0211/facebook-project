import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import EmojiPicker from 'emoji-picker-react';
import TagPeopleModal from './TagPeopleModal';
import { PostData } from '@/lib/dummyData';
import { useAuth } from '../auth/AuthContext';

interface Person {
  id?: string;
  name: string;
  avatar: string;
}

interface EditPostModalProps {
  post: PostData;
  onClose: () => void;
  onEdit: (updatedPost: PostData) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onClose, onEdit }) => {
  const [postContent, setPostContent] = useState(post.content || '');
  const [selectedAudience, setSelectedAudience] = useState('Only me'); // Optional: can be extended
  const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTagPeopleModal, setShowTagPeopleModal] = useState(false);
  const [taggedPeople, setTaggedPeople] = useState<Person[]>(post.taggedPeople || []);
  const [previewMedia, setPreviewMedia] = useState<{type: 'image'|'video', url: string, file?: File}[]>(
    (post.media || []).map(m => ({ type: m.type, url: m.url }))
  );
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onEdit({
      ...post,
      content: postContent,
      media: previewMedia.map(m => ({ type: m.type, url: m.url })),
      taggedPeople: taggedPeople,
    });
  };

  const toggleAudienceDropdown = () => {
    setIsAudienceDropdownOpen(!isAudienceDropdownOpen);
    setShowEmojiPicker(false);
  };

  const selectAudience = (audience: string) => {
    setSelectedAudience(audience);
    setIsAudienceDropdownOpen(false);
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

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMedia = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' as 'image' : 'video' as 'video',
      url: URL.createObjectURL(file),
      file
    }));
    setPreviewMedia(prev => [...prev, ...newMedia]);
  };

  const removeFile = (index: number) => {
    if (previewMedia[index].file) {
      URL.revokeObjectURL(previewMedia[index].url);
    }
    setPreviewMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleTagPeople = (people: Person[]) => {
    setTaggedPeople(people);
    setShowTagPeopleModal(false);
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewMedia.forEach(m => {
        if (m.file) URL.revokeObjectURL(m.url);
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="relative border-b px-4 py-3 border-b-[#dedede]">
          <h1 className="text-xl font-semibold text-center">Edit post</h1>
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
                  src={user?.photoURL || post.author.avatar || "/default-avatar.png"}
                  alt="Your Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{user?.displayName || post.author.name || "User"}</p>
                {/* Audience dropdown (optional) */}
              </div>
            </div>

            {/* Post Content Input */}
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[120px] text-lg resize-none border-0 focus:outline-none focus:ring-0 p-0"
            />

            {/* Tagged People Display */}
            {taggedPeople.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {taggedPeople.map((person, idx) => (
                    <div
                      key={person.id || person.name + idx}
                      className="flex items-center bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{person.name}</span>
                      <button
                        type="button"
                        onClick={() => setTaggedPeople(prev => prev.filter((_, i) => i !== idx))}
                        className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Preview */}
            {previewMedia.length > 0 && (
              <div className="mb-4 border rounded-lg p-2">
                <div className="grid grid-cols-2 gap-2">
                  {previewMedia.map((media, index) => (
                    <div key={index} className="relative aspect-video">
                      {media.type === 'image' ? (
                        <Image src={media.url} alt="Preview" fill className="object-cover rounded-lg" />
                      ) : (
                        <video src={media.url} className="w-full h-full object-cover rounded-lg" controls />
                      )}
                      <button type="button" onClick={() => removeFile(index)} className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Post Options */}
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Add to your post</span>
            <div className="flex items-center space-x-1.5">
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer" onClick={handleFileSelect}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#45BD62" className="w-6 h-6">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer" onClick={() => setShowTagPeopleModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B74E4" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer" onClick={toggleEmojiPicker}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EAB026" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute bottom-[180px] right-4 z-50" onClick={(e) => e.stopPropagation()}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Post Button */}
          <button
            type="submit"
            disabled={!postContent.trim() && previewMedia.length === 0}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
        </form>

        {/* Tag People Modal */}
        {showTagPeopleModal && (
          <TagPeopleModal
            onClose={() => setShowTagPeopleModal(false)}
            onTagPeople={handleTagPeople}
          />
        )}
      </div>
    </div>
  );
};

export default EditPostModal; 
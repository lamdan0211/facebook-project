import React, { useState } from 'react';
import Image from 'next/image';
import SharePostModal from '../modals/SharePostModal';

interface PostCardProps {
  avatarUrl: string;
  userName: string;
  postTime: string;
  postContent: string;
  postImageUrl?: string;
  reactions?: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  commentsCount?: number;
  sharesCount?: number;
}

const PostCard: React.FC<PostCardProps> = ({
  avatarUrl,
  userName,
  postTime,
  postContent,
  postImageUrl,
  reactions = { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
  commentsCount = 0,
  sharesCount = 0,
}) => {
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  const handleReaction = (reactionType: string) => {
    if (userReaction === reactionType) {
      setUserReaction(null);
    } else {
      setUserReaction(reactionType);
    }
    setShowReactionMenu(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // Handle comment submission here
      console.log('Comment submitted:', commentText);
      setCommentText('');
    }
  };

  const getReactionButtonProps = () => {
    switch (userReaction) {
      case 'like':
        return { text: 'Like', color: 'text-blue-600', icon: '👍' };
      case 'love':
        return { text: 'Love', color: 'text-red-500', icon: '❤️' };
      case 'haha':
        return { text: 'Haha', color: 'text-yellow-500', icon: '😂' };
      case 'wow':
        return { text: 'Wow', color: 'text-orange-500', icon: '😮' };
      case 'sad':
        return { text: 'Sad', color: 'text-purple-500', icon: '😢' };
      case 'angry':
        return { text: 'Angry', color: 'text-red-700', icon: '😡' };
      default:
        return { text: 'Like', color: 'text-gray-600', icon: '👍' };
    }
  };

  const reactionButtonProps = getReactionButtonProps();

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      {/* Post Header */}
      <div className="flex items-center mb-2">
        <div className="w-9 h-9 rounded-full overflow-hidden mr-3 bg-gray-300 flex-shrink-0">
          <Image src={avatarUrl} alt="Avatar" width={36} height={36} objectFit="cover" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{userName}</p>
          <p className="text-gray-500 text-xs">{postTime}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3 text-sm text-gray-800 leading-snug">
        <p className="mb-2 last:mb-0">{postContent}</p>
        {postImageUrl && (
          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
            <Image src={postImageUrl} alt="Post Image" width={600} height={400} objectFit="cover" layout="responsive" />
          </div>
        )}
      </div>

      {/* Reactions and Counts */}
      <div className="flex items-center justify-between text-gray-500 text-xs mb-3 border-b border-gray-200 pb-2">
        <div className="flex items-center">
          {totalReactions > 0 && (
            <div className="flex items-center -space-x-1 mr-1">
              {Object.entries(reactions)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([type, count], index) => {
                  if (count > 0) {
                    const emoji = type === 'like' ? '👍' :
                                type === 'love' ? '❤️' :
                                type === 'haha' ? '😂' :
                                type === 'wow' ? '😮' :
                                type === 'sad' ? '😢' : '😡';
                    return <span key={type} className={`z-${index + 1}0`}>{emoji}</span>;
                  }
                  return null;
                })}
            </div>
          )}
          <span className="ml-1">{totalReactions} peoples</span>
        </div>
        <div>
          {commentsCount > 0 && <span className="mr-2">{commentsCount} comments</span>}
          {sharesCount > 0 && <span>{sharesCount} shares</span>}
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between text-gray-600 text-sm">
        <div
          className={`flex items-center px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer flex-1 justify-center group relative ${reactionButtonProps.color}`}
          onMouseEnter={() => setShowReactionMenu(true)}
          onMouseLeave={() => setShowReactionMenu(false)}
        >
          <span className="text-xl mr-2">{reactionButtonProps.icon}</span>
          <span>{reactionButtonProps.text}</span>

          {showReactionMenu && (
            <div 
              className="absolute bottom-[120%] left-0 bg-white rounded-full shadow-lg z-50"
              onMouseEnter={() => setShowReactionMenu(true)}
              onMouseLeave={() => setShowReactionMenu(false)}
            >
              {/* Safe hover area */}
              <div className="absolute bottom-[-30px] left-0 w-full h-[30px]" />
              
              {/* Reaction menu */}
              <div className="relative p-2 flex items-center space-x-2">
                {/* Reactions */}
                <span
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-100"
                  onClick={() => handleReaction('like')}
                >👍</span>
                <span
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-100"
                  onClick={() => handleReaction('love')}
                >❤️</span>
                <span
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-100"
                  onClick={() => handleReaction('haha')}
                >😂</span>
                <span
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-100"
                  onClick={() => handleReaction('wow')}
                >😮</span>
                <span
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-100"
                  onClick={() => handleReaction('sad')}
                >😢</span>
                <span
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-100"
                  onClick={() => handleReaction('angry')}
                >😡</span>
              </div>
            </div>
          )}
        </div>
        <button 
          className="flex items-center px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200 gap-2 flex-1 justify-center"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.76585 19.8847C5.96698 19.9712 6.20164 20 6.40277 20C6.77152 20 7.10674 19.9135 7.37492 19.683L12.3028 16.0231C12.4368 15.9366 12.638 15.879 12.8056 15.879H17.4652C20.8845 15.879 23.6333 13.487 23.6333 10.5764V5.30259C23.6333 2.36311 20.851 0 17.4652 0H6.16812C2.74883 0 0 2.39193 0 5.30259V10.5476C0 13.0548 2.07838 15.245 4.89427 15.7349V18.7032C4.89427 19.2219 5.22949 19.683 5.76585 19.8847ZM1.67612 5.30259C1.67612 3.17003 3.68746 1.44092 6.16812 1.44092H17.4317C19.9123 1.44092 21.9237 3.17003 21.9237 5.30259V10.5187C21.9237 12.6513 19.9123 14.3804 17.4317 14.3804H12.7721C12.2022 14.3804 11.6323 14.5821 11.1965 14.8991L6.57038 18.3573V15.3602C6.57038 14.8703 6.13459 14.438 5.56471 14.3804C3.35224 14.1499 1.67612 12.5072 1.67612 10.5764V5.30259Z" fill="#2C2C2C" />
          </svg>
          <span>Comment</span>
        </button>
        <button 
          className="flex items-center px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200 gap-2 flex-1 justify-center"
          onClick={() => setShowShareModal(true)}
        >
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.06616 19.9704C1.13494 20 1.23812 20 1.30691 20C1.71962 20 2.09793 19.8226 2.30429 19.4974C4.53979 16.3633 8.39174 14.3528 12.6564 14.1163V17.9008C12.6564 18.433 13.0347 18.8765 13.585 19.0834C14.1352 19.2904 14.7887 19.1721 15.2014 18.8173L24.7281 10.657C25.072 10.3614 25.244 10.0066 25.244 9.59264C25.244 9.17871 25.072 8.82392 24.7281 8.52825L15.2358 0.367937C14.8231 0.0131406 14.1696 -0.105125 13.6194 0.10184C13.0347 0.308804 12.6908 0.781866 12.6908 1.28449V4.68463C5.43399 5.57162 0 10.9823 0 17.3095C0 17.9304 0.034392 18.5217 0.137569 19.113C0.206354 19.5565 0.550274 19.8817 1.06616 19.9704ZM14.4104 4.83246V1.78712L23.49 9.59264V9.62221L14.4104 17.4277V13.9093C14.4104 13.5545 14.2384 13.1997 13.9289 12.9632C13.6194 12.7267 13.241 12.5788 12.8283 12.6084C8.39174 12.7858 4.33344 14.6485 1.68522 17.6643V17.3095C1.68522 11.6919 6.56894 6.87254 13.0691 6.13338C13.8257 6.04468 14.4104 5.48292 14.4104 4.83246Z" fill="#2C2C2C" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit} className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
              <Image
                src={avatarUrl}
                alt="User avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-transparent focus:outline-none text-sm"
              />
              <div className="flex space-x-2 ml-2 text-gray-500">
                <button type="button" className="hover:text-gray-700">😊</button>
                <button type="button" className="hover:text-gray-700">GIF</button>
                <button type="button" className="hover:text-gray-700">🏞️</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <SharePostModal
          onClose={() => setShowShareModal(false)}
          author={{
            name: userName,
            avatar: avatarUrl
          }}
          content={postContent}
          imageUrl={postImageUrl}
        />
      )}
    </div>
  );
};

export default PostCard; 
import React, { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image';
import CommentList from './CommentList';
import { CommentData } from '@/lib/dummyData';
import SharePostModal from '../modals/SharePostModal';
import { useAuth } from '../auth/AuthContext';
import TagPeopleModal from '../modals/TagPeopleModal';
import MediaViewerModal from '../modals/MediaViewerModal';
import EditPostModal from '../modals/EditPostModal';
import { usePostContext } from '@/context/PostContext';
import Avatar from '../user/Avatar';


 function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface Person {
  name: string;
  avatar: string;
}

export interface PostProps {
  author: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  media?: { type: 'image' | 'video'; url: string }[];
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  comments: CommentData[];
  shares: number;
  taggedPeople?: Person[];
  onDelete?: () => void;
}

const Post: React.FC<PostProps & { index?: number }> = ({
  author,
  timeAgo,
  content,
  media = [],
  reactions,
  comments,
  shares,
  taggedPeople,
  onDelete,
  index,
}) => {
  const initialTotalReactions = reactions.like + reactions.love + reactions.haha + reactions.wow + reactions.sad + reactions.angry;
  const [currentTotalReactions, setCurrentTotalReactions] = useState(initialTotalReactions);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [allComments, setAllComments] = useState<CommentData[]>(comments);
  const { user } = useAuth();
  const [showTaggedPeopleModal, setShowTaggedPeopleModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const moreBtnRef = useRef<HTMLDivElement>(null);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [mediaViewerIndex, setMediaViewerIndex] = useState(0);
  const { updatePost } = usePostContext();
  const [showEditModal, setShowEditModal] = useState(false);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreBtnRef.current && !moreBtnRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleReaction = (reactionType: string) => {
    if (userReaction === reactionType) {
      setUserReaction(null);
      setCurrentTotalReactions(currentTotalReactions - 1);
    } else {
      if (userReaction === null) {
        setCurrentTotalReactions(currentTotalReactions + 1);
      }
      setUserReaction(reactionType);
    }
    setShowReactionMenu(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment: CommentData = {
        author: {
          name: user?.displayName || 'User',
          avatar: user?.photoURL || "/default-avatar.png",
        },
        content: commentText,
        timeAgo: 'Just now',
        likes: 0
      };
      setAllComments(prev => [newComment, ...prev]);
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
        return { text: 'Like', color: 'text-gray-600', icon: '<svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.382 22H6v-7H4a2 2 0 01-2-2V6a2 2 0 012-2h2v10h2v7h2v-7h3v-3z"></path></svg>' };
    }
  };

  const reactionButtonProps = getReactionButtonProps();

  const handleOpenMediaViewer = (idx: number) => {
    setMediaViewerIndex(idx);
    setShowMediaViewer(true);
  };

  const handleAddComment = (text: string) => {
    if (!user) return;
    const newComment: CommentData = {
      author: {
        name: user.displayName || 'User',
        avatar: user.photoURL || '/default-avatar.png',
      },
      content: text,
      timeAgo: 'Just now',
      likes: 0
    };
    setAllComments(prev => [...prev, newComment]);
  };

  // Render media grid giống Facebook
  const renderMediaGrid = () => {
    if (!media || media.length === 0) return null;
    if (media.length === 1) {
      return media[0].type === 'image' ? (
        <div className="relative w-full cursor-pointer" style={{ paddingBottom: '60%' }} onClick={() => handleOpenMediaViewer(0)}>
          <Image src={media[0].url} alt="Post media" fill style={{ objectFit: 'cover' }} className="rounded-lg" />
        </div>
      ) : (
        <div className="relative w-full cursor-pointer" style={{ paddingBottom: '60%' }} onClick={() => handleOpenMediaViewer(0)}>
          <video src={media[0].url} controls className="w-full rounded-lg max-h-96 object-cover bg-black" />
        </div>
      );
    }
    // 2-4 media: grid
    const gridClass = media.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2';
    return (
      <div className={`grid gap-1 rounded-lg overflow-hidden ${gridClass}`} style={{height: media.length > 2 ? 300 : 200}}>
        {media.slice(0,4).map((m, i) => (
          <div key={i} className="relative w-full h-full aspect-square cursor-pointer" onClick={() => handleOpenMediaViewer(i)}>
            {m.type === 'image' ? (
              <Image src={m.url} alt={`Post media ${i+1}`} fill style={{objectFit:'cover'}} className="" />
            ) : (
              <video src={m.url} controls className="w-full h-full object-cover bg-black" />
            )}
            {i === 3 && media.length > 4 && (
              <div className="absolute inset-0 bg-gray-900/70 bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+{media.length-4}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200 relative">
      {/* Nút X close góc phải */}
      <div className="flex items-center mb-3 gap-2">
          <Avatar 
                author={{avatar: author.name === "Dan Lam" ? "from-red-600 to-red-300" : "from-blue-600 to-blue-300", name: author.name || "User"}} 
              />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800 text-sm">{author.name}</span>
            
            {/* Tag people display */}
            {taggedPeople && taggedPeople.length > 0 && (
              <span className="text-xs text-gray-500">
                is with {taggedPeople.slice(0,2).map((p, i) => (
                  <span key={p.name} className="font-semibold text-gray-700">{p.name}{i < Math.min(1, taggedPeople.length-1) ? ', ' : ''}</span>
                ))}
                {taggedPeople.length > 2 && (
                  <>
                    {' '} and <span className="font-semibold text-blue-600 cursor-pointer" onClick={() => setShowTaggedPeopleModal(true)}>{taggedPeople.length - 2} others</span>
                  </>
                )}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 flex items-center">
            {timeAgo}
            <span className="mx-1">•</span>
            <span>🌍</span>
          </span>
        </div>
        {/* Group more (3 dots) và close (X) vào 1 flex container */}
        <div className="flex items-center gap-1 ml-auto">
          <div
            className="text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full p-1 relative"
            ref={moreBtnRef}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowDropdown((v) => !v)}
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {user && user.displayName === author.name && (
                  <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left text-sm" onClick={() => { setShowEditModal(true); setShowDropdown(false); }}>
                    <span className="text-lg mr-3">✏️</span>
                    <span>
                      <span className="font-semibold">Edit Post</span>
                      <div className="text-xs text-gray-500 whitespace-nowrap">Edit your post.</div>
                    </span>
                  </button>
                )}
                <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left text-sm" onClick={() => setShowDropdown(false)}>
                  <span className="text-lg mr-3">🔖</span>
                  <span>
                    <span className="font-semibold">Save Post</span>
                    <div className="text-xs text-gray-500 whitespace-nowrap">Add this to your saved items.</div>
                  </span>
                </button>
              </div>
            )}
          </div>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={onDelete}
            aria-label="Close post"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-gray-800 text-sm mb-2">{content}</p>
        {renderMediaGrid()}
      </div>

      <div className="flex items-center justify-between text-gray-500 text-xs mb-3 border-b border-gray-200 pb-2">
        <div className="flex items-center">
          {currentTotalReactions > 0 && (
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
          <span className="ml-1">{currentTotalReactions} peoples</span>
        </div>
        <div>
          {comments.length > 0 && <span className="mr-2">{comments.length} comments</span>}
          {shares > 0 && <span>{shares} shares</span>}
        </div>
      </div>

      <div className="flex justify-around text-gray-600 text-sm font-semibold border-b border-gray-200 pb-2 mb-2 relative">
        <div
          className={`flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer flex-1 justify-center group relative ${reactionButtonProps.color}`}
          onMouseEnter={() => setShowReactionMenu(true)}
          onMouseLeave={() => setShowReactionMenu(false)}
        >
          {userReaction ? reactionButtonProps.icon : (
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.7217 11.595C23.7217 10.9293 23.3668 10.2913 22.8182 9.87517C23.2054 9.43135 23.3668 8.87656 23.3022 8.32178C23.1732 7.15673 21.947 6.21359 20.5273 6.21359H16.3326L16.5907 4.49376C16.6552 3.96671 16.6552 3.52289 16.5262 3.07906C16.0422 1.27601 14.1707 0 12.0088 0C11.5248 0 11.0408 0.166436 10.6858 0.471567C10.3309 0.776699 10.1373 1.16505 10.1373 1.58114V3.85576C10.1373 4.85437 9.81464 5.7975 9.20156 6.65742L8.07222 8.21082C7.91088 8.43273 7.68501 8.59917 7.42688 8.71012C7.20101 8.09986 6.55567 7.65603 5.78126 7.65603H2.07055C1.10254 7.65603 0.328125 8.32178 0.328125 9.15395V18.5021C0.328125 19.3343 1.10254 20 2.07055 20H5.84579C6.8138 20 7.58821 19.3343 7.58821 18.5021V18.2802C8.42716 18.9182 9.52424 19.3065 10.7181 19.3065H18.9139C19.6561 19.3065 20.3982 19.0291 20.9145 18.5853C21.4308 18.1415 21.6889 17.5589 21.6566 16.9487C21.6566 16.7268 21.6244 16.5326 21.5276 16.3107C22.3988 15.9223 22.9796 15.1456 22.9796 14.258C22.9796 13.9528 22.915 13.6477 22.786 13.3703C23.3668 12.8988 23.7217 12.2607 23.7217 11.595ZM5.94259 18.4743C5.94259 18.5298 5.87806 18.5853 5.81352 18.5853H2.07055C2.00601 18.5853 1.94148 18.5298 1.94148 18.4743V9.12621C1.94148 9.07073 2.00601 9.01526 2.07055 9.01526H5.84579C5.91033 9.01526 5.97486 9.07073 5.97486 9.12621V18.4743H5.94259ZM20.979 12.982C21.0436 12.7323 21.2372 12.5381 21.4953 12.4272C21.8825 12.2607 22.1084 11.9556 22.0761 11.595C22.0761 11.2067 21.818 10.8738 21.3985 10.7351C21.0436 10.6241 20.8177 10.3745 20.7854 10.0693C20.7531 9.76422 20.9145 9.45908 21.2049 9.29265C21.5276 9.09847 21.7212 8.7656 21.6889 8.43273C21.6244 7.9889 21.0758 7.60055 20.5273 7.60055H16.0744C15.6872 7.60055 15.3 7.43412 15.0419 7.18447C14.7837 6.90707 14.6547 6.5742 14.7192 6.24133L15.0096 4.29958C15.0741 3.93897 15.0419 3.63384 14.9773 3.38419C14.6547 2.21914 13.4608 1.38696 12.041 1.38696C11.9765 1.38696 11.912 1.4147 11.8797 1.44244C11.8474 1.47018 11.8152 1.52566 11.8152 1.58114V3.85576C11.8152 5.10402 11.3957 6.32455 10.6213 7.37864L9.49197 8.93204C9.04023 9.5423 8.36262 9.95839 7.55595 10.1248V15.2288C7.55595 16.7268 8.9757 17.9196 10.6858 17.9196H18.8817C19.2043 17.9196 19.527 17.8086 19.7529 17.6144C19.9465 17.448 20.0433 17.1983 20.0433 16.9764C20.0433 16.7822 19.9787 16.5881 19.8497 16.4494C19.6561 16.1997 19.6238 15.9223 19.7529 15.6449C19.8819 15.3675 20.1723 15.2011 20.495 15.1456C21.0113 15.0624 21.3985 14.6741 21.3985 14.2302C21.3985 14.0361 21.334 13.8419 21.1726 13.6755C20.979 13.4813 20.9145 13.2316 20.979 12.982Z" fill="#2C2C2C"/>
            </svg>
          )}
          <span className={`ml-1`}>
            {reactionButtonProps.text}
          </span>

          {showReactionMenu && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-lg flex items-center space-x-1 transition-opacity duration-200 opacity-100 pointer-events-auto group-hover:opacity-100 z-50">
              <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-full h-[10px]"></div>
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('like')}
              >👍</span>
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('love')}
              >❤️</span>
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('haha')}
              >😂</span>
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('wow')}
              >😮</span>
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('sad')}
              >😢</span>
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('angry')}
              >😡</span>
            </div>
          )}
        </div>
        {/* Comment Button */}
        <button 
          className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer flex-1 justify-center gap-2"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.76585 19.8847C5.96698 19.9712 6.20164 20 6.40277 20C6.77152 20 7.10674 19.9135 7.37492 19.683L12.3028 16.0231C12.4368 15.9366 12.638 15.879 12.8056 15.879H17.4652C20.8845 15.879 23.6333 13.487 23.6333 10.5764V5.30259C23.6333 2.36311 20.851 0 17.4652 0H6.16812C2.74883 0 0 2.39193 0 5.30259V10.5476C0 13.0548 2.07838 15.245 4.89427 15.7349V18.7032C4.89427 19.2219 5.22949 19.683 5.76585 19.8847ZM1.67612 5.30259C1.67612 3.17003 3.68746 1.44092 6.16812 1.44092H17.4317C19.9123 1.44092 21.9237 3.17003 21.9237 5.30259V10.5187C21.9237 12.6513 19.9123 14.3804 17.4317 14.3804H12.7721C12.2022 14.3804 11.6323 14.5821 11.1965 14.8991L6.57038 18.3573V15.3602C6.57038 14.8703 6.13459 14.438 5.56471 14.3804C3.35224 14.1499 1.67612 12.5072 1.67612 10.5764V5.30259Z" fill="#2C2C2C" />
          </svg>
          <span>Comment</span>
        </button>
        {/* Share Button */}
        <button 
          className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer flex-1 justify-center gap-2"
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
              <Avatar 
                author={{avatar: user?.displayName === "Dan Lam" ? "from-red-600 to-red-300" : "from-blue-600 to-blue-300", name: user?.displayName || "User"}} 
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
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <CommentList comments={allComments} />

      {/* Share Modal */}
      {showShareModal && (
        <SharePostModal
          onClose={() => setShowShareModal(false)}
          author={author}
          content={content}
          imageUrl={media?.find(m => m.type === 'image')?.url}
        />
      )}

      {showTaggedPeopleModal && (
        <TagPeopleModal
          onClose={() => setShowTaggedPeopleModal(false)}
          onTagPeople={() => {}} // No-op, just for display
        />
      )}

      {/* Media Viewer Modal */}
      {showMediaViewer && (
        <MediaViewerModal
          media={media}
          initialIndex={mediaViewerIndex}
          comments={allComments}
          onClose={() => setShowMediaViewer(false)}
          onComment={handleAddComment}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && user && user.displayName === author.name && (
        <EditPostModal
          post={{ author, timeAgo, content, media, reactions, comments, shares, taggedPeople }}
          onClose={() => setShowEditModal(false)}
          onEdit={(updatedPost) => {
            if (typeof index === 'number') updatePost(index, updatedPost);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Post; 
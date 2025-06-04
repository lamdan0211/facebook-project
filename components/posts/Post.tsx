import React, { useState } from 'react';
import Image from 'next/image'; 
import CommentList from './CommentList'; 
import { CommentData } from '@/lib/dummyData'; 

export interface PostProps { 
  author: {
    name: string;
    avatar: string; 
  };
  timeAgo: string;
  content: string;
  imageUrl?: string; 
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
}

const Post: React.FC<PostProps> = ({
  author,
  timeAgo,
  content,
  imageUrl,
  reactions,
  comments,
  shares,
}) => {
  const initialTotalReactions = reactions.like + reactions.love + reactions.haha + reactions.wow + reactions.sad + reactions.angry;
  const [currentTotalReactions, setCurrentTotalReactions] = useState(initialTotalReactions);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactionMenu, setShowReactionMenu] = useState(false);

  const handleReaction = (reactionType: string) => {
    
    if (userReaction === reactionType) {
      setUserReaction(null);
      setCurrentTotalReactions(currentTotalReactions - 1);
    } else {
      if (userReaction === null) {
        setCurrentTotalReactions(currentTotalReactions + 1);
      } else {
      }
      setUserReaction(reactionType);
    }
    setShowReactionMenu(false); 
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

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200">
      <div className="flex items-center mb-3">
        <Image
          src={author.avatar}
          alt={`${author.name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <div>
          <p className="font-semibold text-gray-800 text-sm">{author.name}</p>
          <p className="text-xs text-gray-500 flex items-center">
            {timeAgo}
            <span className="mx-1">•</span>
            <span>🌍</span> 
          </p>
        </div>
        <div className="ml-auto text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full p-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-gray-800 text-sm mb-2">{content}</p>
        {imageUrl && (
          <div className="relative w-full" style={{ paddingBottom: '60%' }}>
            <Image
              src={imageUrl}
              alt="Post image"
              fill 
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-gray-500 text-xs mb-3 border-b border-gray-200 pb-2">
        <div className="flex items-center">
          <div className="flex items-center -space-x-1 mr-1">
            {reactions.like > 0 && <span className="z-10">👍</span>}
            {reactions.love > 0 && <span className="z-20">❤️</span>}
            {reactions.haha > 0 && <span className="z-30">😂</span>}
            {reactions.wow > 0 && <span className="z-40">😮</span>}
            {reactions.sad > 0 && <span className="z-50">😢</span>}
            {reactions.angry > 0 && <span className="z-60">😡</span>}
          </div>
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
              <path fillRule="evenodd" clipRule="evenodd" d="M23.7183 11.595C23.7183 10.9293 23.3634 10.2913 22.8148 9.87517C23.202 9.43135 23.3634 8.87656 23.2988 8.32178C23.1698 7.15673 21.9436 6.21359 20.5239 6.21359H16.3292L16.5873 4.49376C16.6518 3.96671 16.6518 3.52289 16.5228 3.07906C16.0388 1.27601 14.1673 0 12.0054 0C11.5214 0 11.0374 0.166436 10.6824 0.471567C10.3275 0.776699 10.1339 1.16505 10.1339 1.58114V3.85576C10.1339 4.85437 9.81122 5.7975 9.19814 6.65742L8.0688 8.21082C7.90746 8.43273 7.68159 8.59917 7.42346 8.71012C7.19759 8.09986 6.55225 7.65603 5.77784 7.65603H2.06713C1.09912 7.65603 0.324707 8.32178 0.324707 9.15395V18.5021C0.324707 19.3343 1.09912 20 2.06713 20H5.84237C6.81038 20 7.58479 19.3343 7.58479 18.5021V18.2802C8.42374 18.9182 9.52082 19.3065 10.7147 19.3065H18.9105C19.6527 19.3065 20.3948 19.0291 20.9111 18.5853C21.4274 18.1415 21.6855 17.5589 21.6532 16.9487C21.6532 16.7268 21.621 16.5326 21.5242 16.3107C22.3954 15.9223 22.9762 15.1456 22.9762 14.258C22.9762 13.9528 22.9116 13.6477 22.7826 13.3703C23.3634 12.8988 23.7183 12.2607 23.7183 11.595ZM5.93917 18.4743C5.93917 18.5298 5.87464 18.5853 5.8101 18.5853H2.06713C2.00259 18.5853 1.93806 18.5298 1.93806 18.4743V9.12621C1.93806 9.07073 2.00259 9.01526 2.06713 9.01526H5.84237C5.90691 9.01526 5.97144 9.07073 5.97144 9.12621V18.4743H5.93917ZM20.9756 12.982C21.0402 12.7323 21.2338 12.5381 21.4919 12.4272C21.8791 12.2607 22.105 11.9556 22.0727 11.595C22.0727 11.2067 21.8146 10.8738 21.3951 10.7351C21.0402 10.6241 20.8143 10.3745 20.782 10.0693C20.7497 9.76422 20.9111 9.45908 21.2015 9.29265C21.5242 9.09847 21.7178 8.7656 21.6855 8.43273C21.621 7.9889 21.0724 7.60055 20.5239 7.60055H16.071C15.6838 7.60055 15.2966 7.43412 15.0385 7.18447C14.7803 6.90707 14.6513 6.5742 14.7158 6.24133L15.0062 4.29958C15.0707 3.93897 15.0385 3.63384 14.9739 3.38419C14.6513 2.21914 13.4574 1.38696 12.0376 1.38696C11.9731 1.38696 11.9086 1.4147 11.8763 1.44244C11.844 1.47018 11.8118 1.52566 11.8118 1.58114V3.85576C11.8118 5.10402 11.3923 6.32455 10.6179 7.37864L9.48855 8.93204C9.03681 9.5423 8.3592 9.95839 7.55253 10.1248V15.2288C7.55253 16.7268 8.97228 17.9196 10.6824 17.9196H18.8783C19.2009 17.9196 19.5236 17.8086 19.7495 17.6144C19.9431 17.448 20.0399 17.1983 20.0399 16.9764C20.0399 16.7822 19.9753 16.5881 19.8463 16.4494C19.6527 16.1997 19.6204 15.9223 19.7495 15.6449C19.8785 15.3675 20.1689 15.2011 20.4916 15.1456C21.0079 15.0624 21.3951 14.6741 21.3951 14.2302C21.3951 14.0361 21.3306 13.8419 21.1692 13.6755C20.9756 13.4813 20.9111 13.2316 20.9756 12.982Z" />
            </svg>

          )}
          <span className={`ml-1`}>
            {reactionButtonProps.text}
          </span>

          {showReactionMenu && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-lg flex items-center space-x-1 transition-opacity duration-200 opacity-100 pointer-events-auto group-hover:opacity-100">
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
              >😮</span> {/* Wow icon */}
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('sad')}
              >😢</span> {/* Sad icon */}
              <span
                className="text-xl cursor-pointer hover:scale-125 transition-transform duration-100"
                onClick={() => handleReaction('angry')}
              >😡</span> {/* Angry icon */}
            </div>
          )}
        </div>
        {/* Comment Button */}
        <button className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer flex-1 justify-center gap-2">
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.02269 19.8847C6.22382 19.9712 6.45848 20 6.65961 20C7.02836 20 7.36358 19.9135 7.63176 19.683L12.5596 16.0231C12.6936 15.9366 12.8948 15.879 13.0624 15.879H17.722C21.1413 15.879 23.8901 13.487 23.8901 10.5764V5.30259C23.8901 2.36311 21.1078 0 17.722 0H6.42496C3.00567 0 0.256836 2.39193 0.256836 5.30259V10.5476C0.256836 13.0548 2.33522 15.245 5.15111 15.7349V18.7032C5.15111 19.2219 5.48633 19.683 6.02269 19.8847ZM1.93296 5.30259C1.93296 3.17003 3.9443 1.44092 6.42496 1.44092H17.6885C20.1691 1.44092 22.1805 3.17003 22.1805 5.30259V10.5187C22.1805 12.6513 20.1691 14.3804 17.6885 14.3804H13.0289C12.459 14.3804 11.8891 14.5821 11.4533 14.8991L6.82722 18.3573V15.3602C6.82722 14.8703 6.39143 14.438 5.82155 14.3804C3.60908 14.1499 1.93296 12.5072 1.93296 10.5764V5.30259Z" />
          </svg>


          <span>Comment</span>
        </button>
        {/* Share Button */}
        <button className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer flex-1 justify-center gap-2">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.82593 19.9704C1.89471 20 1.99789 20 2.06668 20C2.47939 20 2.8577 19.8226 3.06406 19.4974C5.29956 16.3633 9.15151 14.3528 13.4162 14.1163V17.9008C13.4162 18.433 13.7945 18.8765 14.3448 19.0834C14.895 19.2904 15.5485 19.1721 15.9612 18.8173L25.4879 10.657C25.8318 10.3614 26.0038 10.0066 26.0038 9.59264C26.0038 9.17871 25.8318 8.82392 25.4879 8.52825L15.9956 0.367937C15.5829 0.0131406 14.9294 -0.105125 14.3792 0.10184C13.7945 0.308804 13.4506 0.781866 13.4506 1.28449V4.68463C6.19376 5.57162 0.759766 10.9823 0.759766 17.3095C0.759766 17.9304 0.794158 18.5217 0.897335 19.113C0.96612 19.5565 1.31004 19.8817 1.82593 19.9704ZM15.1702 4.83246V1.78712L24.2498 9.59264V9.62221L15.1702 17.4277V13.9093C15.1702 13.5545 14.9982 13.1997 14.6887 12.9632C14.3792 12.7267 14.0008 12.5788 13.5881 12.6084C9.15151 12.7858 5.09321 14.6485 2.44499 17.6643V17.3095C2.44499 11.6919 7.32871 6.87254 13.8289 6.13338C14.5855 6.04468 15.1702 5.48292 15.1702 4.83246Z" />
          </svg>

          <span>Share</span>
        </button>
      </div>

      {/* Add Comment Section */}
      <div className="flex items-center">
        <Image
          src="https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg" // Using placeholder path
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full mr-3"
        />
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Add comment"
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
          <div className="flex space-x-3 ml-2 text-gray-500 text-lg">
            <span>😊</span>
            <span>GIF</span>
            <span>🏞️</span>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <CommentList comments={comments} /> {/* Use comments from props */}
    </div>
  );
};

export default Post; 
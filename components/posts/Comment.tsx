import React from 'react';
import Image from 'next/image';
import Avatar from '../user/Avatar';

 function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface CommentProps {
  author: {
    name: string;
    avatar: string; // URL or path to avatar image
  };
  content: string;
  timeAgo: string;
}

const Comment: React.FC<CommentProps> = ({
  author,
  content,
  timeAgo,
}) => {
  return (
    <div className="flex items-start space-x-2 mb-2">
      {/* Author Avatar */}
      <Avatar author={{avatar: "from-teal-500 to-cyan-500", name: author.name}} />
      <div className="flex-1">
        <div className="bg-gray-100 p-2 rounded-xl">
          <p className="text-gray-800 font-semibold text-sm">{author.name}</p>
          <p className="text-gray-700 text-sm mt-0.5">{content}</p>
        </div>
         {/* Optional: Time ago and Like/Reply options for comment */}
        <div className="text-xs text-gray-500 mt-1 ml-3 flex items-center space-x-3">
            <span>{timeAgo}</span>
            <span className="cursor-pointer hover:underline">Like</span>
            <span className="cursor-pointer hover:underline">Reply</span>
        </div>
      </div>
    </div>
  );
};

export default Comment; 
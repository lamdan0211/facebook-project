import React from 'react';
import Comment from './Comment'; // Import the Comment component

interface CommentListProps {
  comments: {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timeAgo: string;
  }[];
}

const CommentList: React.FC<CommentListProps> = ({
  comments
}) => {
  return (
    <div className="mt-4">
      {comments.map((comment, index) => (
        <Comment
          key={index} // Use a unique ID in a real application
          author={comment.author}
          content={comment.content}
          timeAgo={comment.timeAgo}
        />
      ))}
    </div>
  );
};

export default CommentList; 
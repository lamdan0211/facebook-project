import React, { useState } from 'react';
import Image from 'next/image';
import SharePostModal from '../modals/SharePostModal';
import { useAuth } from '../auth/AuthContext';
import { PostData } from '@/lib/dummyData';
import Post from '@/components/posts/Post';

interface PostCardProps {
  post: PostData;
  onEdit?: (updatedPost: PostData) => void;
  onDelete?: () => void;
  index?: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete, index }) => {
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
  const {user} = useAuth();

  // Lấy dữ liệu từ post
  const { author, timeAgo, content, media, reactions, comments, shares, taggedPeople } = post;

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

  return <Post {...post} onEdit={onEdit} onDelete={onDelete} index={index} />;
};

export default PostCard; 
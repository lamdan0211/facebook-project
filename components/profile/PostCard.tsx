import Image from 'next/image';

interface PostCardProps {
  avatarUrl: string;
  userName: string;
  postTime: string;
  postContent: string;
  postImageUrl?: string; // Optional image for the post
}

const PostCard: React.FC<PostCardProps> = ({
  avatarUrl,
  userName,
  postTime,
  postContent,
  postImageUrl,
}) => {
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

      {/* Post Actions (Like, Comment, Share) */}
      <div className="flex items-center text-gray-600 text-xs border-t border-b border-gray-200 py-2 -mx-3 px-3 justify-around">
        <button className="flex items-center px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200">
          <div className="w-4 h-4 mr-1 bg-gray-400"></div> {/* Placeholder Like Icon */}
          <span>Like</span>
        </button>
        <button className="flex items-center px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200">
           <div className="w-4 h-4 mr-1 bg-gray-400"></div> {/* Placeholder Comment Icon */}
          <span>Comment</span>
        </button>
        <button className="flex items-center px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200">
           <div className="w-4 h-4 mr-1 bg-gray-400"></div> {/* Placeholder Share Icon */}
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section (Placeholder) */}
      <div className="mt-3 text-gray-600 text-xs">
        {/* Individual comments will go here */}
        <p>View all comments...</p>
      </div>
    </div>
  );
};

export default PostCard; 
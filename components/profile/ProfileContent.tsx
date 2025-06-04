import PostCard from '@/components/profile/PostCard';
import Image from 'next/image';

const ProfileContent = () => {
  // Placeholder post data with online image URLs for avatars and post images
  const posts = [
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?avatar,sig=20', // Online placeholder avatar
      userName: 'User Name 1',
      postTime: '2 hours ago',
      postContent: 'Đây là nội dung của bài viết đầu tiên với hình ảnh giả lập.',
      postImageUrl: 'https://source.unsplash.com/random/600x400?post,sig=21', // Online placeholder post image
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?person,sig=22', // Online placeholder avatar
      userName: 'User Name 2',
      postTime: 'Yesterday',
      postContent: 'Đây là nội dung của bài viết thứ hai. Nó dài hơn một chút để kiểm tra bố cục mà không có hình ảnh.',
      // No image for this post
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?profile,sig=23', // Online placeholder avatar
      userName: 'User Name 3',
      postTime: '2 days ago',
      postContent: 'Nội dung bài viết thứ ba với một hình ảnh giả lập khác.',
      postImageUrl: 'https://source.unsplash.com/random/600x400?nature,sig=24', // Online placeholder post image
    },
  ];

  return (
    <div className="w-full md:w-2/3 space-y-4">
      {/* Create Post section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Post</h2>
        <div className="flex items-center mb-4">
           <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-300 flex-shrink-0">
             {/* Placeholder for current user avatar */}
             {/* Using online placeholder image URL */}
             <Image src="https://source.unsplash.com/random/100x100?current-user-avatar,sig=25" alt="Your Avatar" width={40} height={40} objectFit="cover" />
           </div>
           <textarea
             className="flex-1 p-2 bg-gray-100 rounded-full focus:outline-none focus:ring-blue-500 text-sm text-gray-700 placeholder-gray-500 resize-none overflow-hidden"
             rows={1} // Adjusted rows for single line input initially
             placeholder="What's on your mind, User Name?"
             style={{ minHeight: '40px', paddingTop: '10px', paddingBottom: '10px' }} // Add some vertical padding
           ></textarea>
        </div>
        <div className="flex justify-around border-t border-gray-200 pt-3 -mx-4 px-4">
           <button className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
             <div className="w-5 h-5 mr-2 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"></div> {/* Placeholder Live Video Icon */}
             Live Video
           </button>
           <button className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
              <div className="w-5 h-5 mr-2 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"></div> {/* Placeholder Photo/Video Icon */}
              Photo/Video
           </button>
           <button className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
              <div className="w-5 h-5 mr-2 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs"></div> {/* Placeholder Feeling/Activity Icon */}
              Feeling/Activity
           </button>
        </div>
      </div>

      {/* Posts Feed section */}
      <div className="space-y-4">
        {/* Render PostCard components */}
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileContent; 
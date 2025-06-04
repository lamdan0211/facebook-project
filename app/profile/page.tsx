<<<<<<< HEAD
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';
import Header from '@/components/layout/Header';

export default function ProfilePage() {
  // Using online placeholder image URLs
  const userData = {
    coverPhotoUrl: 'https://source.unsplash.com/random/1200x400?facebook-cover', // Online placeholder cover image
    profilePictureUrl: 'https://source.unsplash.com/random/200x200?face', // Online placeholder profile picture
    userName: 'Tên Người Dùng Giả Lập', // Placeholder name
  };

  // Placeholder post data with online image URLs
  const posts = [
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?avatar',
      userName: 'User Name 1',
      postTime: '2 hours ago',
      postContent: 'Đây là nội dung của bài viết đầu tiên với hình ảnh giả lập.',
      postImageUrl: 'https://source.unsplash.com/random/600x400?post',
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?person',
      userName: 'User Name 2',
      postTime: 'Yesterday',
      postContent: 'Đây là nội dung của bài viết thứ hai. Nó dài hơn một chút để kiểm tra bố cục mà không có hình ảnh.',
      // No image for this post
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?profile',
      userName: 'User Name 3',
      postTime: '2 days ago',
      postContent: 'Nội dung bài viết thứ ba với một hình ảnh giả lập khác.',
      postImageUrl: 'https://source.unsplash.com/random/600x400?nature',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <Header />
      {/* Adjusted padding: px-4 for small screens, md:px-6 for medium+, lg:px-8 for large+ */}
      {/* ProfileHeader is now outside the container to be full width */}
      <ProfileHeader {...userData} />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-4">
        {/* Added max-width to the flex container for sidebar and content */}
        <div className="flex flex-col md:flex-row mt-4 lg:mt-6 mx-auto max-w-[1000px]">
          {/* On medium and larger screens, sidebar takes 1/3 and content takes 2/3 */}
          {/* Pass friends data to sidebar if needed later */}
          <ProfileSidebar />
          {/* Pass posts data to content if needed later */}
          <ProfileContent />
        </div>
      </div>
=======
import Image from 'next/image';

const posts = [
  {
    id: 1,
    author: 'Lam Dan',
    avatar: 'https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg',
    time: '1 giờ trước',
    content: 'Chào mọi người! Đây là post đầu tiên trên Facebook clone.',
    image: 'https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg',
  },
  {
    id: 2,
    author: 'Lam Dan',
    avatar: 'https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg',
    time: '2 ngày trước',
    content: 'Check-in Đà Lạt cùng bạn bè!',
    image: '',
  },
];

const photos = [
  'https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg',
  'https://images.pexels.com/photos/11035398/pexels-photo-11035398.jpeg',
  'https://images.pexels.com/photos/7117521/pexels-photo-7117521.jpeg',
  'https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg',
  'https://images.pexels.com/photos/842871/pexels-photo-842871.jpeg',
  'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
  'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
];

export default function ProfilePage() {
  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      {/* Cover Photo */}
      <div className="relative h-72 w-full bg-gray-300">
        <Image
          src="https://images.pexels.com/photos/11035398/pexels-photo-11035398.jpeg"
          alt="cover"
          fill
          className="object-cover"
        />
        {/* Avatar */}
        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2">
          <Image
            src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg"
            alt="avatar"
            width={168}
            height={168}
            className="rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>
      {/* Info section + content */}
      <div className="max-w-5xl mx-auto mt-24 px-4 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="md:w-1/3 flex flex-col gap-6">
          {/* Giới thiệu */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-bold text-lg mb-3">Giới thiệu</h2>
            <div className="flex items-center gap-2 text-gray-700 mb-2"><span>Liz</span> <span className="text-pink-500">❤️</span></div>
            <button className="w-full bg-gray-200 text-gray-800 rounded-md py-2 text-sm font-semibold hover:bg-gray-300 mb-3">Chỉnh sửa tiểu sử</button>
            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1"><span>💼</span> PHP Web Developer tại <span className="font-semibold">CareerViet.vn</span></div>
            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1"><span>🎓</span> Học Information of Technology (IT) tại <span className="font-semibold">Trường Đại học Sài Gòn</span></div>
            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1"><span>🏠</span> Sống tại <span className="font-semibold">Thành phố Hồ Chí Minh</span></div>
            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1"><span>❤️</span> Hẹn hò</div>
            <div className="flex items-center gap-2 text-gray-700 text-sm mb-3"><span>🔗</span> <a href="#" className="text-blue-600 hover:underline">leo.dthanh</a></div>
            <button className="w-full bg-gray-200 text-gray-800 rounded-md py-2 text-sm font-semibold hover:bg-gray-300 mb-2">Chỉnh sửa chi tiết</button>
            <button className="w-full bg-gray-200 text-gray-800 rounded-md py-2 text-sm font-semibold hover:bg-gray-300">Thêm nội dung đáng chú ý</button>
          </div>
          {/* Ảnh */}
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-lg">Ảnh</h2>
              <a href="#" className="text-blue-600 text-sm hover:underline">Xem tất cả ảnh</a>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(0, 9).map((url, idx) => (
                <div key={idx} className="w-full aspect-square rounded-md overflow-hidden">
                  <Image src={url} alt="photo" width={120} height={120} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="md:w-2/3 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Lam Dan</h1>
              <p className="text-gray-600">100 bạn bè • Sống tại TP.HCM</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700">Chỉnh sửa trang cá nhân</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300">...</button>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-300 mb-6">
            <button className="py-3 px-2 border-b-2 border-blue-600 font-semibold text-blue-600">Bài viết</button>
            <button className="py-3 px-2 text-gray-600 hover:text-blue-600">Giới thiệu</button>
            <button className="py-3 px-2 text-gray-600 hover:text-blue-600">Bạn bè</button>
            <button className="py-3 px-2 text-gray-600 hover:text-blue-600">Ảnh</button>
            <button className="py-3 px-2 text-gray-600 hover:text-blue-600">Video</button>
            <button className="py-3 px-2 text-gray-600 hover:text-blue-600">Xem thêm</button>
          </div>
          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-2">
                  <Image src={post.avatar} alt="avatar" width={40} height={40} className="rounded-full object-cover mr-3" />
                  <div>
                    <div className="font-semibold">{post.author}</div>
                    <div className="text-xs text-gray-500">{post.time}</div>
                  </div>
                </div>
                <div className="mb-2 text-gray-800">{post.content}</div>
                {post.image && (
                  <div className="relative w-full h-64 mt-2">
                    <Image src={post.image} alt="post" fill className="object-cover rounded-lg" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
>>>>>>> e9ce893b9d92fe732bd88ee8f8294dbd123dd4e1
    </div>
  );
} 
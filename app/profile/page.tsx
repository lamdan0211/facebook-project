import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';
import Header from '@/components/layout/Header';

export default function ProfilePage() {
  const userData = {
    coverPhotoUrl: 'https://source.unsplash.com/random/1200x400?facebook-cover',
    profilePictureUrl: 'https://source.unsplash.com/random/200x200?face', 
    userName: 'Tên Người Dùng Giả Lập', 
  };

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
      <ProfileHeader {...userData} />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-4">
        <div className="flex flex-col md:flex-row mt-4 lg:mt-6 mx-auto max-w-[1000px]">
          <ProfileSidebar />
          <ProfileContent />
        </div>
      </div>
    </div>
  );
} 
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';
import Header from '@/components/layout/Header';
import { PostProvider } from '@/context/PostContext';

export default function ProfilePage() {
  const userData = {
    coverPhotoUrl: 'https://source.unsplash.com/random/1200x400?facebook-cover',
    profilePictureUrl: 'https://source.unsplash.com/random/200x200?face', 
    userName: 'Tên Người Dùng Giả Lập', 
  };

  return (
    <PostProvider>
      <div className="bg-gray-100 min-h-screen py-4">
        <ProfileHeader {...userData} />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-4">
          <div className="flex flex-col md:flex-row mt-4 lg:mt-6 mx-auto max-w-[1200px]">
            <ProfileSidebar />
            <ProfileContent />
          </div>
        </div>
      </div>
    </PostProvider>
  );
} 
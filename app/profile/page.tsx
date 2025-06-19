import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';
import Header from '@/components/layout/Header';
import { PostProvider } from '@/context/PostContext';

export default function ProfilePage() {
  const userData = {
    coverPhotoUrl: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=1200&h=400&fit=crop',
    profilePictureUrl: 'https://images.pexels.com/photos/32394873/pexels-photo-32394873.jpeg',
    userName: 'Tên Người Dùng Giả Lập',
  };

  return (
    <PostProvider>
      <div className="bg-gray-100 min-h-screen">
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
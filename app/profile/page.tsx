'use client';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';
import Header from '@/components/layout/Header';
import { PostProvider } from '@/context/PostContext';
import { useAuth } from '@/components/auth/AuthContext';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    fetch(`http://localhost:3301/backend/user/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('API /backend/user/{id} trả về:', data);
        setProfile(data);
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="text-center py-10">Đang tải thông tin cá nhân...</div>;
  if (!profile) return <div className="text-center py-10 text-red-500">Không tìm thấy thông tin người dùng.</div>;

  const userData = {
    coverPhotoUrl: profile.coverpic || '',
    profilePictureUrl: profile.profilepic || '',
    userName: profile.fullname || profile.email || '',
  };

  return (
    <PostProvider>
      <div className="bg-gray-100 min-h-screen">
        <ProfileHeader {...userData} />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-4">
          <div className="flex flex-col md:flex-row mt-4 lg:mt-6 mx-auto max-w-[1200px]">
            <ProfileSidebar profile={profile} />
            <ProfileContent profile={profile} />
          </div>
        </div>
      </div>
    </PostProvider>
  );
} 
"use client";
import React, { useState, useEffect } from "react";
import Post from "@/components/posts/Post";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import useRequireAuth from "@/lib/useRequireAuth";
import { PostData } from "@/lib/dummyData";

const SavedPage = () => {
  useRequireAuth();
  const [savedPosts, setSavedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const res = await fetch('http://localhost:3301/backend/postsaved', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch saved posts');
        }
        const data = await res.json();
        // Backend trả về mảng các object PostSaved, mỗi object có chứa 'post'
        const extractedPosts = data.map((item: any) => ({
          ...item.post, // Lấy toàn bộ dữ liệu của bài post
          author: { // Map lại author để đảm bảo đúng cấu trúc
            name: item.post.user?.fullname || item.post.user?.email || 'User',
            avatar: item.post.user?.profilepic || '/default-avatar.png',
            email: item.post.user?.email || '',
          },
          // Cung cấp giá trị mặc định cho các thuộc tính còn thiếu
          reactions: item.post.reactions || { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
          comments: item.post.comments || [],
          shares: item.post.shares || 0,
          timeAgo: item.post.timeAgo || new Date(item.post.createdAt).toLocaleDateString(),
        }));
        setSavedPosts(extractedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  const handleUnsave = (postId: number) => {
    setSavedPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
  };

  return (
    <>
      <Header />
      <div className="flex bg-gray-100 min-h-screen">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 min-h-screen">
          <LeftSidebar />
        </aside>
        {/* Main Content */}
        <main className="flex-1 max-w-xl mx-auto py-6 px-2">
          <h1 className="text-2xl font-bold mb-4">Saved Posts</h1>
          {loading ? (
            <div className="text-center py-10">Loading saved posts...</div>
          ) : savedPosts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <div className="text-lg font-semibold">No saved items</div>
              <div className="text-sm">You haven't saved any posts yet.</div>
            </div>
          ) : (
            <div className="space-y-4">
              {savedPosts.map((post) => (
                <Post key={post.id} {...post} isOnSavedPage={true} onUnsave={() => handleUnsave(post.id)} />
              ))}
            </div>
          )}
        </main>
        {/* Right Sidebar (optional, để trống hoặc thêm gì đó sau) */}
        <aside className="hidden lg:block w-72 flex-shrink-0"></aside>
      </div>
    </>
  );
};

export default SavedPage; 


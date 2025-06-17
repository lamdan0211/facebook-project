"use client";
import React from "react";
import { initialPosts } from "@/lib/dummyData";
import Post from "@/components/posts/Post";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";

const SavedPage = () => {
  // Lọc các post đã lưu (isSaved=true)
  const savedPosts = initialPosts.filter(post => post.isSaved);

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
          <h1 className="text-2xl font-bold mb-4">Saved</h1>
          {savedPosts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <img src="/no-saved.svg" alt="No saved" className="mx-auto mb-4 w-32 h-32 opacity-60" />
              <div className="text-lg font-semibold">No saved items</div>
              <div className="text-sm">You haven't saved any posts yet.</div>
            </div>
          ) : (
            <div className="space-y-4">
              {savedPosts.map((post, idx) => (
                <Post key={idx} {...post} />
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
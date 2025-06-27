"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Image from "next/image";

export default function Pages() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPages, setLikedPages] = useState<any[]>([]);
  const [loadingLiked, setLoadingLiked] = useState(true);
  const [errorLiked, setErrorLiked] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      setError(null);
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const res = await fetch('http://localhost:3301/pages/suggested', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) throw new Error('Không thể lấy danh sách page!');
        const data = await res.json();
        // Map API data sang format card
        const mapped = (Array.isArray(data) ? data : []).map((item: any) => ({
          id: item.id,
          name: item.name,
          desc: item.description,
          avatar: item.pagePicture,
          liked: false,
          likes: '', // Nếu API có trường likes thì map vào đây
          sub: '',
        }));
        setPages(mapped);
      } catch (err: any) {
        setError(err.message || 'Đã có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchLikedPages = async () => {
      setLoadingLiked(true);
      setErrorLiked(null);
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const res = await fetch('http://localhost:3301/pages/liked', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) throw new Error('Không thể lấy danh sách page đã thích!');
        const data = await res.json();
        const mapped = (Array.isArray(data) ? data : []).map((item: any) => ({
          id: item.id,
          name: item.name,
          desc: item.description,
          avatar: item.pagePicture,
        }));
        setLikedPages(mapped);
      } catch (err: any) {
        setErrorLiked(err.message || 'Đã có lỗi xảy ra!');
      } finally {
        setLoadingLiked(false);
      }
    };
    fetchLikedPages();
  }, []);

  const handleLike = (id: number) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };
  const handleClose = (id: number) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden md:flex">
        <aside className="hidden md:block lg:w-72 bg-gray-100 p-4 overflow-y-auto flex-shrink-0">
          <LeftSidebar />
        </aside>
        <main className="flex-1 overflow-auto scrollbar-hide p-4 flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Liked Pages</h2>
            {loadingLiked ? (
              <div className="text-center text-gray-500 py-4">Loading...</div>
            ) : errorLiked ? (
              <div className="text-center text-red-500 py-4">{errorLiked}</div>
            ) : likedPages.length === 0 ? (
              <div className="text-center text-gray-400 py-4">You haven't liked any pages yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {likedPages.map((page) => (
                  <div key={page.id} className="relative bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col">
                    <div className="flex flex-col items-center gap-2 px-4 pt-6 pb-2">
                      <Image
                        src={page.avatar}
                        alt={page.name}
                        width={64}
                        height={64}
                        className="rounded-full border-4 border-white bg-white shadow"
                      />
                      <span className="font-bold text-gray-900 leading-tight text-base mt-2">{page.name}</span>
                      <span className="text-xs text-gray-600">{page.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Pages</h2>
            <h3 className="text-lg text-gray-600 mb-6">Suggested for you</h3>
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading pages...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pages.map((page) => (
                <div key={page.id} className="relative bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col">
                  {/* Close button */}
                  
                  {/* Avatar + Info */}
                  <div className="flex flex-col items-center gap-2 px-4 pt-6 pb-2">
                    <Image
                      src={page.avatar}
                      alt={page.name}
                      width={64}
                      height={64}
                      className="rounded-full border-4 border-white bg-white shadow"
                    />
                    <span className="font-bold text-gray-900 leading-tight text-base mt-2">{page.name}</span>
                    <span className="text-xs text-gray-600">{page.desc}</span>
                  </div>
                  {/* Sub info */}
                  <div className="px-4 mt-2 text-xs text-gray-500">
                    {page.sub}
                  </div>
                  {/* Likes */}
                  <div className="px-4 text-xs text-gray-500 mb-2">{page.likes}</div>
                  {/* Like button */}
                  <div className="px-4 pb-4 mt-auto">
                    <button
                      className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors ${page.liked ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => handleLike(page.id)}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6.5 10.5l2 2 5-5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="#2563eb" strokeWidth="2"/></svg>
                      {page.liked ? 'Đã thích' : 'Thích'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </main>
        <aside className="hidden lg:block lg:w-72 bg-gray-100 p-4 overflow-y-auto flex-shrink-0">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
} 
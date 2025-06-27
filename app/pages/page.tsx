"use client";
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Image from "next/image";

const demoPages = [
  {
    id: 1,
    name: "M-TP",
    desc: "Nghệ sỹ/Bạn nhạc",
    avatar: "https://i.imgur.com/1.jpg",
    cover: "https://i.imgur.com/cover1.jpg",
    liked: false,
    likes: "50 người thích Trang này",
    sub: "Quang Hoàng và 50 người khác thích Trang này",
  },
  {
    id: 2,
    name: "Đặng Thành Kiên",
    desc: "Thể thao & giải trí",
    avatar: "https://i.imgur.com/2.jpg",
    cover: "https://i.imgur.com/cover2.jpg",
    liked: false,
    likes: "94,6K người thích Trang này",
    sub: "",
  },
  // ... thêm các page khác tương tự
];

export default function Pages() {
  const [pages, setPages] = useState(demoPages);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Khám phá Trang</h2>
            <h3 className="text-lg text-gray-600 mb-6">Gợi ý cho bạn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pages.map((page) => (
                <div key={page.id} className="relative bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col">
                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 bg-black bg-opacity-40 rounded-full p-1 hover:bg-opacity-70 z-10"
                    onClick={() => handleClose(page.id)}
                    title="Ẩn gợi ý này"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
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
          </div>
        </main>
        <aside className="hidden lg:block lg:w-72 bg-gray-100 p-4 overflow-y-auto flex-shrink-0">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
} 
"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { PostContext } from "@/context/PostContext";
import Post from "@/components/posts/Post";
import { useAuth } from "@/components/auth/AuthContext";

export default function SearchPage() {
  const { posts } = useContext(PostContext);
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  // Lọc kết quả theo content, author, tag
  const results = posts.filter(post => {
    const q = query.toLowerCase();
    return (
      post.content.toLowerCase().includes(q) ||
      post.author.name.toLowerCase().includes(q) ||
      (post.taggedPeople && post.taggedPeople.some(p => p.name.toLowerCase().includes(q)))
    );
  });

  // Gợi ý trending (lấy 5 post nhiều reaction nhất)
  const trending = [...posts]
    .sort((a, b) => {
      const ra = Object.values(a.reactions).reduce((s, v) => s + v, 0);
      const rb = Object.values(b.reactions).reduce((s, v) => s + v, 0);
      return rb - ra;
    })
    .slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <div className="mb-8">
        <input
          type="text"
          className="w-full text-2xl px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          placeholder="Search Facebook..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>
      {query === "" && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Trending Searches</h2>
          <div className="space-y-2">
            {trending.map((post, i) => (
              <div
                key={i}
                className="cursor-pointer hover:bg-gray-100 rounded-lg px-4 py-2"
                onClick={() => setQuery(post.content.slice(0, 30))}
              >
                <span className="font-medium text-blue-600">{post.author.name}</span>: {post.content.slice(0, 60)}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-4">
        {query && results.length === 0 && (
          <div className="text-gray-500 text-center">No results found.</div>
        )}
        {results.map((post, i) => (
          <Post key={i} {...post} />
        ))}
      </div>
    </div>
  );
} 



// Giao diện input tìm kiếm lớn, hiện trending (bài nhiều reaction nhất).
// Kết quả tìm kiếm realtime: lọc theo nội dung, tên tác giả, người được tag.
// Hiển thị kết quả giống NewsFeed (dùng lại component Post, đầy đủ media, tag, comment...).
// Giao diện hiện đại, UX mượt mà, có gợi ý trending, placeholder, trạng thái không tìm thấy.
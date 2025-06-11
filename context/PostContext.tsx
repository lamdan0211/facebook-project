'use client';
import React, { createContext, useState, ReactNode } from 'react';
import { PostData, initialPosts } from '@/lib/dummyData';

interface PostContextType {
  posts: PostData[];
  addNewPost: (post: PostData) => void;
  removePost: (index: number) => void;
  updatePost: (index: number, updatedPost: PostData) => void;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  addNewPost: () => {},
  removePost: () => {},
  updatePost: () => {},
});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostData[]>(initialPosts);

  const addNewPost = (post: PostData) => {
    setPosts(prev => [post, ...prev]);
  };

  const removePost = (index: number) => {
    setPosts(prev => prev.filter((_, i) => i !== index));
  };

  const updatePost = (index: number, updatedPost: PostData) => {
    setPosts(prev => prev.map((post, i) => (i === index ? updatedPost : post)));
  };

  return (
    <PostContext.Provider value={{ posts, addNewPost, removePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
}; 
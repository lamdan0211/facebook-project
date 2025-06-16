"use client";
import React from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";

export default function SavedPage() {
  // Placeholder: In a real app, fetch saved items for the user
  const savedItems = [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 max-w-xs border-r border-gray-200 bg-white">
        <LeftSidebar />
      </div>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Saved</h1>
        <div className="w-full max-w-xl">
          {savedItems.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
              You haven't saved any items yet.
            </div>
          ) : (
            <div>
              {/* Map saved items here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
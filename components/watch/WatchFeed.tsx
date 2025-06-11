import React from 'react';
import Image from 'next/image';
import { watchVideos } from '@/lib/dummyData';

const WatchFeed = () => {
  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      {watchVideos.map(video => (
        <div key={video.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 border border-gray-200">
          <div className="relative w-full md:w-64 h-40 md:h-36 cursor-pointer">
            <video
              poster={video.thumbnail}
              src={video.videoUrl}
              controls
              className="w-full h-full rounded-lg object-cover bg-black"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image src={video.author.avatar} alt={video.author.name} width={32} height={32} className="rounded-full w-8 h-8 object-cover" />
                <span className="font-semibold">{video.author.name}</span>
                <span className="text-xs text-gray-500 ml-2">{video.timeAgo}</span>
              </div>
              <h2 className="text-lg font-bold mb-2">{video.title}</h2>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-gray-600 text-sm">👍 {video.reactions.like}</span>
              <span className="text-gray-600 text-sm">❤️ {video.reactions.love}</span>
              <span className="text-gray-600 text-sm">😂 {video.reactions.haha}</span>
              <span className="text-gray-600 text-sm">😮 {video.reactions.wow}</span>
              <span className="text-gray-600 text-sm">🔁 {video.shares}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchFeed; 
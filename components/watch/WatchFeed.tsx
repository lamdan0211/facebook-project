import React, { useRef, useState } from 'react';
import { watchVideos } from '@/lib/dummyData';

const WatchFeed = () => {
  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      {watchVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

const VideoCard = ({ video }: { video: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const value = parseFloat(e.target.value);
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  const handleHoverPlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div
        className="relative w-full h-64 bg-black"
        onMouseEnter={handleHoverPlay}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          poster={video.thumbnail}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Nút Play/Pause overlay */}
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={handlePlayPause}
        >
          <div className="bg-black bg-opacity-50 rounded-full p-3">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </div>
        </button>

        {/* Thanh điều khiển */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-4 py-2 flex items-center gap-3 text-white text-sm">
          {/* Thời gian */}
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          {/* Thanh seek */}
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 accent-white"
          />
          <span className="w-10">{formatTime(duration)}</span>

          {/* Nút âm lượng */}
          <button onClick={handleMuteToggle} title="Tắt/Bật tiếng">
            {isMuted ? (
              <span className="text-lg">🔇</span>
            ) : (
              <span className="text-lg">🔊</span>
            )}
          </button>

          {/* Nút fullscreen */}
          <button onClick={handleFullScreen} title="Toàn màn hình">
            <span className="text-lg">⛶</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={video.author.avatar}
            alt={video.author.name}
            width={32}
            height={32}
            className="rounded-full w-8 h-8 object-cover"
          />
          <span className="font-semibold">{video.author.name}</span>
          <span className="text-xs text-gray-500 ml-2">{video.timeAgo}</span>
        </div>

        <h2 className="text-lg font-bold mb-2">{video.title}</h2>

        <div className="flex items-center gap-4 mt-2 text-lg">
          <span>👍 {video.reactions.like}</span>
          <span>❤️ {video.reactions.love}</span>
          <span>😂 {video.reactions.haha}</span>
          <span>😮 {video.reactions.wow}</span>
          <span className="ml-auto text-sm text-gray-600">🔁 {video.shares} chia sẻ</span>
        </div>
      </div>
    </div>
  );
};


export default WatchFeed;

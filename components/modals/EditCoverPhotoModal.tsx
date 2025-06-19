'use client'
import React, { useRef, useState } from 'react';

interface EditCoverPhotoModalProps {
  onClose: () => void;
}

const EditCoverPhotoModal: React.FC<EditCoverPhotoModalProps> = ({ onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!preview) return;
    setLoading(true);
    // Lưu cover photo tạm vào localStorage
    setTimeout(() => {
      localStorage.setItem('temp_cover_photo', preview);
      setLoading(false);
      onClose();
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 relative" onClick={e => e.stopPropagation()}>
        <button className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-center mb-4">Cập nhật Cover Photo</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-40 md:h-60 lg:h-80 rounded-lg overflow-hidden border-4 border-white shadow-md z-10 bg-gray-300 flex-shrink-0 relative">
            {preview ? (
              <img src={preview} alt="Cover preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 flex items-center justify-center w-full h-full">Chưa chọn ảnh</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            Chọn ảnh mới
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 cursor-pointer"
            onClick={handleSave}
            disabled={!preview || loading}
          >
            {loading ? 'Đang lưu...' : 'Lưu cover photo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoverPhotoModal; 
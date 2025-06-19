'use client'
import React, { useRef, useState } from 'react';

interface EditAvatarModalProps {
  onClose: () => void;
  userId: number;
  accessToken: string;
  onUploaded?: () => void;
}

const EditAvatarModal: React.FC<EditAvatarModalProps> = ({ onClose, userId, accessToken, onUploaded }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setError(null);
      console.log('Chọn file:', f);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append('file', file);
      console.log('Bắt đầu upload file:', file);
      const uploadRes = await fetch('http://localhost:3301/backend/common/upload-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const uploadData = await uploadRes.json();
      console.log('Kết quả upload:', uploadData);
      if (!uploadData.path) throw new Error('Không nhận được path từ API upload');
      const imageUrl = `http://localhost:3301/${uploadData.path}`;
      // 2. Gọi API update profilepic
      console.log('Gọi PUT update profilepic:', imageUrl);
      const updateRes = await fetch(`http://localhost:3301/backend/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ profilepic: imageUrl })
      });
      const updateData = await updateRes.json();
      console.log('Kết quả update profilepic:', updateData);
      if (onUploaded) {
        console.log('Gọi callback onUploaded');
        onUploaded();
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi không xác định');
      console.error('Lỗi upload avatar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs mx-4 p-6 relative" onClick={e => e.stopPropagation()}>
        <button className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-center mb-4">Cập nhật Avatar</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-gray-300 flex-shrink-0 relative">
            {preview ? (
              <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            Chọn ảnh mới
          </button>
          <button
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 mt-4"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? 'Đang lưu...' : 'Lưu ảnh đại diện'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EditAvatarModal; 
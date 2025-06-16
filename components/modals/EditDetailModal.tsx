'use client';

import React, { useState } from 'react';

interface EditDetailModalProps {
  onClose: () => void;
}

const EditDetailModal: React.FC<EditDetailModalProps> = ({ onClose }) => {
  const [bio, setBio] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [workPlace, setWorkPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu lên server hoặc cập nhật context
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Edit Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              className="w-full border rounded-md p-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Write something about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nơi sinh</label>
            <input
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={birthPlace}
              onChange={e => setBirthPlace(e.target.value)}
              placeholder="Nhập nơi sinh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nơi làm việc</label>
            <input
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={workPlace}
              onChange={e => setWorkPlace(e.target.value)}
              placeholder="Nhập nơi làm việc"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >Lưu thông tin</button>
        </form>
      </div>
    </div>
  );
};

export default EditDetailModal; 
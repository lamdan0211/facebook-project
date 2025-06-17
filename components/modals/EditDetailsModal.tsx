"use client";
import React, { useState } from 'react';

interface EditDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: DetailsData) => void;
  initialData: DetailsData;
}

export interface DetailsData {
  workAt: string;
  studiedAt: string;
  livesIn: string;
  from: string;
  bio: string;
}

const EditDetailsModal: React.FC<EditDetailsModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState<DetailsData>(initialData);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Edit Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Work at</label>
            <input type="text" name="workAt" value={form.workAt} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Studied at</label>
            <input type="text" name="studiedAt" value={form.studiedAt} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lives in</label>
            <input type="text" name="livesIn" value={form.livesIn} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <input type="text" name="from" value={form.from} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={3} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsModal; 
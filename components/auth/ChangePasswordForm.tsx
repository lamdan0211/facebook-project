"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ChangePasswordForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.oldPassword) errs.oldPassword = 'Vui lòng nhập mật khẩu cũ';
    if (!formData.newPassword) errs.newPassword = 'Vui lòng nhập mật khẩu mới';
    else if (formData.newPassword.length < 6) errs.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    if (formData.confirmPassword !== formData.newPassword) errs.confirmPassword = 'Mật khẩu xác nhận không khớp';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (!validate()) return;
    setLoading(true);
    // TODO: Gọi API đổi mật khẩu thật nếu có backend
    setTimeout(() => {
      setLoading(false);
      if (formData.oldPassword === '123456') { // giả lập đúng mật khẩu cũ
        setSuccess('Đổi mật khẩu thành công!');
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setError('Mật khẩu cũ không đúng!');
      }
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-56px)] bg-gray-100 flex items-center justify-center py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Đổi mật khẩu</h1>
        </div>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Mật khẩu cũ"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Mật khẩu mới"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu mới"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm; 
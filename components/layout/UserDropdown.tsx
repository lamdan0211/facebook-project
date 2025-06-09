"use client";
import { useAuth } from "@/components/auth/AuthContext";
import Image from "next/image";
import { useState } from "react";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <Image
          src={user.photoURL || "/default-avatar.png"}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium">{user.displayName || user.email}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <div className="px-4 py-2 border-b">
            <div className="font-bold">{user.displayName || "No Name"}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 
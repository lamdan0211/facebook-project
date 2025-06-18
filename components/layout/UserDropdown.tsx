"use client";
import { useAuth } from "@/components/auth/AuthContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Avatar from "../user/Avatar";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);


  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
   //  Auto-close dropdown when click outside
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2 focus:outline-none cursor-pointer" onClick={() => setOpen((o) => !o)}>
       <Avatar author={{avatar: "from-red-600 to-red-300", name: user?.fullname || "User"}} />
        <span className="font-medium">{user.fullname || "No Name"}</span>
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <Link href="/profile" className="px-4 py-2 border-b border-b-[#dedede] flex items-center gap-2">
            <Avatar author={{avatar: "from-red-600 to-red-300", name: user?.fullname || "User"}} />
            <div className="flex flex-col">
              <div className="font-bold">{user.fullname || "No Name"}</div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 
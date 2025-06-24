"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: (accessToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  login: async () => {},
  loginGoogle: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3301/backend/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // console.log('API response:', res);
      const data = await res.json().catch(() => null);
      // console.log('API response data:', data);
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      setUser(data.user);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      // console.log('Đăng nhập thành công:', data);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      const errMsg = error instanceof Error ? error.message : String(error);
      alert(errMsg || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };
  const loginGoogle = async (accessToken:string) => {
    try {
      const res = await fetch('http://localhost:3301/backend/auth/login-google-firebase', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      // console.log('API response:', res);
      const data = await res.json().catch(() => null);
      // console.log('API response data:', data);
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      setUser(data.user);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      // console.log('Đăng nhập thành công:', data);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      const errMsg = error instanceof Error ? error.message : String(error);
      alert(errMsg || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  }
  const logout = async () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}; 
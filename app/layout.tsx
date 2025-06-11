import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthContext';
import { PostProvider } from '@/context/PostContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning>
        <AuthProvider>
          <PostProvider>
            {children}
          </PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

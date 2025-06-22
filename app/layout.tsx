import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthContext';
import { PostProvider } from '@/context/PostContext';
import { SearchProvider } from '@/context/SearchContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning>
        <AuthProvider>
          <SearchProvider>
            <PostProvider>
              {children}
            </PostProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

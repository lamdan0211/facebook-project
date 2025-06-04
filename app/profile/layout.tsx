import Header from '@/components/layout/Header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
} 
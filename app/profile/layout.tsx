import Header from '@/components/layout/Header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="pt-14">{children}</div>
    </div>
  );
} 
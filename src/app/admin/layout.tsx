import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDF9F9]">
      <Sidebar />
      <main className="ml-64">
        {children}
      </main>
    </div>
  );
}
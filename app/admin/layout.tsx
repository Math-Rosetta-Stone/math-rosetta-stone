import { AdminUtils } from "./_components/admin-utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminUtils />
      {children}
    </div>
  );
}

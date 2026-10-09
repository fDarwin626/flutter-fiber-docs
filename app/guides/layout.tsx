import Sidebar from "@/components/Sidebar";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="md:ml-64">{children}</main>
    </>
  );
}
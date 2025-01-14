import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SidebarAdmin from "@/Components/admin/SidebarAdmin";
import NavbarAdmin from "@/Components/admin/NavbarAdmin";

export const metadata = {
  title: "SMKN 5 || Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.is_superuser || !session.accessToken) {
    redirect("/404");
  }

  return (
    <>
      <main className="m-0 font-sans antialiased font-normal text-lg leading-default bg-gray-50 text-slate-500 relative h-screen">
        <div className="absolute top-0 left-0 w-full bg-[#3a3086] min-h-72 z-0"></div>
        <SidebarAdmin />
        <section className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-64 rounded-xl overflow-hidden">
          <NavbarAdmin />
          <div
            className="p-6 overflow-y-auto h-[calc(100vh-4rem)]"
            style={{
              maxHeight: "calc(100vh - 4rem)",
            }}
          >
            {children}
          </div>
        </section>
      </main>
    </>
  );
}

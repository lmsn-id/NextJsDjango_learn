import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SidebarAkademik from "@/Components/akademi/Sidebar";

export const metadata = {
  title: "SMKN 5 || Akademik",
};

export default async function AkademikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  const allowedPositions = ["Kepala Sekolah", "Guru", "Staff", "Tata Usaha"];

  if (
    !session ||
    !session.accessToken ||
    !session.user.username ||
    !allowedPositions.includes(session.user.posisi ?? "")
  ) {
    redirect("/404");
  }

  return (
    <>
      <section className="flex">
        <SidebarAkademik>{children}</SidebarAkademik>
      </section>
    </>
  );
}

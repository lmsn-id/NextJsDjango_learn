import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SidebarSiswa from "@/Components/siswa/SidebarSiswa";

export const metadata = {
  title: "SMKN 5 || e-Learning",
};

export default async function elearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    session.user.role !== "siswa" ||
    !session.accessToken ||
    !session.user.username
  ) {
    redirect("/404");
  }

  return (
    <>
      <SidebarSiswa>{children}</SidebarSiswa>
    </>
  );
}

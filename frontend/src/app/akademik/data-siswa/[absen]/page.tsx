"use client";
import { usePathname } from "next/navigation";

export default function AbsenSiswa() {
  const pathname = usePathname();
  const selectedClass = pathname?.split("/").pop();

  return (
    <>
      <h1>Absen Siswa untuk Kelas: {selectedClass}</h1>
    </>
  );
}

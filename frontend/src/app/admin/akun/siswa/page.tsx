"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetDataSiswa } from "@/hook/useGet";
import { useRouter } from "next/navigation";

export default function SiswaPage() {
  const {
    jurusanList,
    kelasList,
    currentPage,
    setJurusan,
    setKelas,
    setCurrentPage,
    currentItems,
    totalPages,
    handleDelete,
  } = useGetDataSiswa();

  const GetPage = usePathname();
  const BaseUrl = `${GetPage}`;
  const router = useRouter();

  const handleEditClick = async (Nis: string) => {
    const url = `${BaseUrl}/update/${Nis}`;
    router.push(url);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md">
      <div className="p-6">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-gray-900 text-lg font-semibold">
            Tabel Akun Siswa
          </h1>
        </div>
        <div className="header">
          <div className="w-full flex justify-between mb-4 items-center">
            <div className="sortir flex gap-4">
              <select
                name="sortByJurusan"
                id="sortByJurusan"
                className="p-2 border rounded-lg bg-[#3a3086] text-white"
                defaultValue={""}
                onChange={(e) => setJurusan(e.target.value)}
              >
                <option value="" disabled>
                  Sort By Jurusan
                </option>
                <option value="">All</option>
                {jurusanList.map((jurusanItem, index) => (
                  <option key={index} value={jurusanItem}>
                    {jurusanItem}
                  </option>
                ))}
              </select>

              <select
                name="sortByKelas"
                id="sortByKelas"
                className="p-2 border rounded-lg bg-[#3a3086] text-white"
                defaultValue={""}
                onChange={(e) => setKelas(e.target.value)}
              >
                <option value="" disabled>
                  Sort By Kelas
                </option>
                <option value="">All</option>
                {kelasList.map((kelasItem, index) => (
                  <option key={index} value={kelasItem}>
                    {kelasItem}
                  </option>
                ))}
              </select>
            </div>
            <div className="add">
              <Link
                href={`${BaseUrl}/add-siswa`}
                className="p-2 border rounded-lg bg-[#3a3086] text-white"
              >
                Add Siswa
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[410px] overflow-y-auto border-t border-gray-300">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                  No
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                  Nama
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                  Nis
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                  Jurusan{" "}
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                  Kelas
                </th>
                <th className="px-6 py-3 border-b border-gray-300 flex justify-center text-lg">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((siswa, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {siswa.Nama}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {siswa.Nis}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {siswa.Jurusan}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {siswa.Kelas}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg space-x-6">
                    <button
                      onClick={() => handleDelete(siswa.Nis, siswa.Nama)}
                      className="p-2 bg-red-500 text-white rounded-lg"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => handleEditClick(siswa.Nis)}
                      className="p-2 bg-blue-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

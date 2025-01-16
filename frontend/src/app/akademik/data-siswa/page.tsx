"use client";
import { usePathname, useRouter } from "next/navigation";
import { GetDataSiswaAkademik } from "@/hook/Akademik";

export default function DataSiswa() {
  const { selectedClass, classOptions, selectedClassInfo, handleClassChange } =
    GetDataSiswaAkademik();

  const pathname = usePathname();
  const router = useRouter();

  const baseurl = () => {
    const basePath = pathname?.split("/").slice(0, 3).join("/");
    return basePath;
  };

  const PushAbsen = () => {
    router.push(`${baseurl()}/${selectedClass}`);
  };

  return (
    <>
      <section className="w-full bg-white rounded-lg">
        <div className="p-8 flex flex-col gap-8">
          <div className="header mb-4">
            <h1 className="text-lg font-bold text-gray-800 text-center">
              Data Siswa {selectedClass}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-100 rounded-lg shadow p-4 flex flex-col justify-between">
              <h2 className="text-sm font-medium text-gray-600 mb-2">
                Absensi Siswa
              </h2>
              <div className="relative w-full mb-4">
                <select
                  className="text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  {classOptions.map((option) =>
                    option.kelasMateri.map((kelas) => (
                      <option key={kelas} value={kelas}>
                        {kelas}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">
                  Total Data Siswa
                </span>
                <span className="text-xl font-bold text-blue-600">50</span>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg shadow p-4 flex flex-col justify-between">
              <h2 className="text-sm font-medium text-gray-600 mb-2">
                Kehadiran
              </h2>
              <div className="relative w-full mb-4">
                <select
                  className="text-sm font-medium text-green-600 bg-white border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  {classOptions.map((option) =>
                    option.kelasMateri.map((kelas) => (
                      <option key={kelas} value={kelas}>
                        {kelas}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">
                  Kehadiran Hari Ini
                </span>
                <span className="text-xl font-bold text-green-600">45</span>
              </div>
            </div>

            <div className="bg-yellow-100 rounded-lg shadow p-4 flex flex-col justify-between">
              <h2 className="text-sm font-medium text-gray-600 mb-2">
                Pertemuan
              </h2>
              <div className="relative w-full mb-4">
                <select
                  className="text-sm font-medium text-yellow-600 bg-white border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  {classOptions.map((option) =>
                    option.kelasMateri.map((kelas) => (
                      <option key={kelas} value={kelas}>
                        {kelas}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">
                  Total Pertemuan
                </span>
                <span className="text-xl font-bold text-yellow-600">12</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">
                {selectedClassInfo || "Pilih kelas untuk melihat detail"}
              </span>
              <button
                onClick={PushAbsen}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Absen
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-300 text-gray-800 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Nama</th>
                  <th className="py-3 px-6 text-left">Nis</th>
                  <th className="py-3 px-6 text-left">Kehadiran</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

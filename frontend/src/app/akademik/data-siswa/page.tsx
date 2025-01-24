"use client";
import { usePathname, useRouter } from "next/navigation";
import { GetDataSiswaAkademik } from "@/hook/Akademik";

export default function DataSiswa() {
  const { selectedClass, setSelectedClass, classOptions, siswa } =
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

  const sortedSiswa = siswa
    ? [...siswa].sort((a, b) => a.Nama.localeCompare(b.Nama))
    : [];

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  const getMateriByKelas = (): string | null => {
    for (const option of classOptions) {
      if (option.kelasMateri.includes(selectedClass)) {
        return option.value;
      }
    }
    return null;
  };

  const selectedClassInfo = getMateriByKelas();

  const Dropdown = ({ color }: { color: string }) => (
    <select
      className={`text-sm font-medium text-${color}-600 bg-white border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-2 focus:ring-${color}-500 focus:outline-none`}
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
  );

  return (
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
              <Dropdown color="blue" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">
                Total Data Siswa
              </span>
              <span className="text-xl font-bold text-blue-600">
                {siswa?.length || 0}
              </span>
            </div>
          </div>

          <div className="bg-green-100 rounded-lg shadow p-4 flex flex-col justify-between">
            <h2 className="text-sm font-medium text-gray-600 mb-2">
              Kehadiran
            </h2>
            <div className="relative w-full mb-4">
              <Dropdown color="green" />
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
              <Dropdown color="yellow" />
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
                <th className="py-3 px-6 text-center">No</th>
                <th className="py-3 px-6 text-center">Nama</th>
                <th className="py-3 px-6 text-center">Nis</th>
                <th className="py-3 px-6 text-center">Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {sortedSiswa.map((s, index) => (
                <tr key={s.Nis} className="border-b border-gray-300">
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {s.Nama}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    {s.Nis}
                  </td>
                  <td className="px-6 py-3 text-center font-semibold text-lg">
                    Hadir
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { GiBookmarklet } from "react-icons/gi";
import { FcDocument } from "react-icons/fc";
import Link from "next/link";

export default function MateriTugas() {
  const items = [
    {
      mapel: "Kepemimpinan",
      kode: "CB0002 2 SKS - Reguler A",
      materi: "Materi Sekolah",
      tugas: "Tugas Sekolah",
      link: "/",
    },
    {
      mapel: "Bahasa Indonesia",
      kode: "FD0005 2 SKS - Reguler A",
      materi: "Materi Sekolah",
      tugas: "Tugas Sekolah",
      link: "/",
    },
    {
      mapel: "Sistem Basis Data",
      kode: "IT0008 4 SKS - Reguler A",
      materi: "Materi Sekolah",
      tugas: "Tugas Sekolah",
      link: "/",
    },
    {
      mapel: "Manajemen Proyek Sistem Informasi",
      kode: "IT0009 3 SKS - Reguler A",
      materi: "Materi Sekolah",
      tugas: "Tugas Sekolah",
      link: "/",
    },
    {
      mapel: "Pemrograman Berorientasi Obyek",
      kode: "IT0010 4 SKS - Reguler A",
      materi: "Materi Sekolah",
      tugas: "Tugas Sekolah",
      link: "/",
    },
    {
      mapel: "Pengantar Jaringan Komputer",
      kode: "IT0011 2 SKS - Reguler A",
      materi: "Materi Sekolah",
      tugas: "Tugas Sekolah",
      link: "/",
    },
  ];

  return (
    <>
      <div className="m-5">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Materi & Tugas
        </h1>

        <div className="flex items-center gap-5">
          <select
            name=""
            id=""
            className="p-2 border-2 rounded-lg border-gray-300 focus:border-blue-600 w-auto"
          >
            <option value="2023/2024" className="w-auto">
              2023/2024 Ganjil
            </option>
            <option value="2022/2023" className="w-auto">
              2022/2023 Genap
            </option>
            <option value="2021/2022" className="w-auto">
              2021/2022 Ganjil
            </option>
            <option value="2020/2021" className="w-auto">
              2020/2021 Genap
            </option>
            <option value="2019/2020" className="w-auto">
              2019/2020 Ganjil
            </option>
          </select>
          <div className="">
            <h2 className="text-lg font-bold text-gray-900">Pilih Periode</h2>
          </div>
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white shadow-xl mb-4 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-base font-bold text-gray-800">
                      {item.mapel}
                    </div>
                    <div className="text-sm font-normal text-gray-800">
                      {item.kode}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute w-full border-t border-gray-300"></div>
                </div>

                <div className="mt-auto">
                  <div className="w-full flex">
                    <Link
                      href={item.link}
                      className="w-1/2 flex justify-center gap-1 flex-col items-center"
                    >
                      <div className="flex items-center gap-1">
                        <FcDocument className="text-lg text-gray-800" />
                        <p className="text-sm font-medium">{item.materi}</p>
                      </div>
                      <p className="text-orange-300">10</p>
                    </Link>

                    <div className="relative">
                      <div className="absolute w-[1px] bg-gray-300 h-full"></div>
                    </div>

                    <Link
                      href={item.link}
                      className="w-1/2 flex justify-center gap-1 flex-col items-center"
                    >
                      <div className="flex items-center gap-1">
                        <GiBookmarklet className="text-lg text-green-500" />
                        <p className="text-sm font-medium">{item.tugas}</p>
                      </div>
                      <p className="text-orange-300">10</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

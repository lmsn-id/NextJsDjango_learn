export default function elearning() {
  return (
    <>
      <div className="m-5 ">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-purple-400 to-purple-500">
            <div className="flex items-center justify-between mb-2 ">
              <div className="text-2xl">⭐</div>
              <div className="text-sm md:text-lg font-semibold">
                Nilai Rata-Rata
              </div>
            </div>
            <div className="relative">
              <div className="absolute w-full border-t border-white"></div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between">
                <div className="text-lg md:text-2xl font-bold">3,79</div>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-lg font-semibold">
                Tetap dari semester lalu
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-blue-400 to-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">📄</div>
              <div className="text-sm md:text-lg font-semibold">Tagihan</div>
            </div>
            <div className="relative">
              <div className="absolute w-full border-t border-white"></div>
            </div>
            <div className=" mt-5">
              <div className="flex flex-wrap gap-2">
                <div className="text-lg md:text-2xl font-bold">Rp</div>
                <div className="text-lg md:text-2xl font-bold">10.866.000</div>
              </div>
              <p className="text-sm md:text-lg font-semibold">
                Tetap dari semester lalu
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-red-400 to-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">🎓</div>
              <div className="text-sm md:text-lg font-semibold ">Semester</div>
            </div>
            <div className="relative">
              <div className="absolute w-full border-t border-white"></div>
            </div>
            <div className="mt-5">
              <div className="flex justify-center mt-5">
                <div className="text-2xl md:text-3xl font-bold">2</div>
              </div>
              <p className="text-sm md:text-lg font-semibold">
                TKJ 1 12 Angkatan 2021
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-purple-400 to-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">📊</div>
              <div className="text-sm md:text-lg font-semibold">
                Jumlah Mapel
              </div>
            </div>
            <div className="relative">
              <div className="absolute w-full border-t border-white"></div>
            </div>
            <div className="mt-5">
              <div className="flex justify-center ">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                  <span className="text-yellow-500 text-lg font-bold">10</span>
                </div>
              </div>
              <p className="text-sm md:text-lg font-semibold">
                10 Mata Pelajaran Semester 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

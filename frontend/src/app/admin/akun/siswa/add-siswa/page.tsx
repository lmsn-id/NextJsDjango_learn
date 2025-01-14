"use client";
import { InputTypeNumber } from "@/hook/useComponents";
import { AddAkunSiswa } from "@/hook/usePost";

export default function AddSiswaPage() {
  const { inputnumber, handleInput } = InputTypeNumber();
  const { FormData, handleChange, handleSubmit } = AddAkunSiswa();

  return (
    <>
      <div className="w-full h-full bg-white rounded-2xl shadow-md">
        <div className="p-6 max-h-full overflow-y-auto">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">Add Siswa</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nis"
              >
                NIS
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nis"
                name="Nis"
                type="text"
                placeholder="Masukan NIS"
                value={FormData.Nis}
                onChange={handleChange}
                ref={inputnumber}
                onInput={handleInput}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nama"
              >
                Nama
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nama"
                name="Nama"
                type="text"
                placeholder="Masukan Nama"
                value={FormData.Nama}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="jurusan"
              >
                Jurusan
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="jurusan"
                name="Jurusan"
                type="text"
                placeholder="Masukan Jurusan"
                value={FormData.Jurusan}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="kelas"
              >
                Kelas
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="kelas"
                name="Kelas"
                type="text"
                placeholder="Masukan Kelas"
                value={FormData.Kelas}
                onChange={handleChange}
                ref={inputnumber}
                onInput={handleInput}
              />
            </div>

            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md px-4 py-2 text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

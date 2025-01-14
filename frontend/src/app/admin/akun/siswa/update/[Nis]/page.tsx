"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

interface Siswa {
  Nis: string;
  Nama: string;
  Kelas: string;
  Jurusan: string;
}

async function getDataSiswa(Nis: string) {
  const session = await getSession();

  if (!session || !session.accessToken) {
    throw new Error(
      "User is not authenticated or session is missing accessToken"
    );
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/UpdateSiswa/${Nis}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return await response.json();
}

async function updateDataSiswa(Nis: string, data: Siswa) {
  const session = await getSession();

  if (!session || !session.accessToken) {
    throw new Error(
      "User is not authenticated or session is missing accessToken"
    );
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/UpdateSiswa/${Nis}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update data");
  }

  return await response.json();
}

export default function UpdateSiswa() {
  const [formData, setFormData] = useState<Siswa>({
    Nis: "",
    Nama: "",
    Kelas: "",
    Jurusan: "",
  });
  const pathname = usePathname();
  const Nis = pathname ? pathname.split("/").pop() : "";
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!Nis) throw new Error("NIS tidak ditemukan di URL.");
        const studentData = await getDataSiswa(Nis);
        setFormData(studentData.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Terjadi kesalahan tidak terduga.");
        }
      }
    }
    fetchData();
  }, [Nis]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!Nis) throw new Error("NIS tidak valid.");
      const updatedData = await updateDataSiswa(Nis, formData);
      toast.success(updatedData.message || "Data berhasil diperbarui!", {
        onClose: () => {
          router.push(updatedData.redirect);
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Terjadi kesalahan tidak terduga.");
      }
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md">
      <div className="p-6 max-h-full overflow-y-auto">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-gray-900 text-lg font-semibold">Update Siswa</h1>
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
              value={formData.Nis}
              onChange={handleChange}
              disabled
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
              value={formData.Nama}
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
              value={formData.Kelas}
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
              value={formData.Jurusan}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

type SekolahFormData = {
  id: string;
  Nip: number;
  Nuptk: number;
  Nama: string;
  Kelas?: string;
  Materi: string[];
  Posisi: string;
};

async function getDataSekolah(id: string) {
  const session = await getSession();
  if (!session || !session.accessToken) {
    throw new Error(
      "User is not authenticated or session is missing accessToken"
    );
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/UpdateDataAkademik/${id}`;
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

async function updateDataSekolah(id: string, data: SekolahFormData) {
  const session = await getSession();
  if (!session || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/UpdateDataAkademik/${id}`;
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

export default function UpdateAkademik() {
  const { register, handleSubmit, setValue, control, watch } =
    useForm<SekolahFormData>({
      defaultValues: {
        Materi: [],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Materi",
  });
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname ? pathname.split("/").pop() : "";
  const posisi = watch("Posisi");

  useEffect(() => {
    if (id) {
      getDataSekolah(id)
        .then((data) => {
          setValue("Nip", data.data.Nip);
          setValue("Nuptk", data.data.Nuptk);
          setValue("Nama", data.data.Nama);
          setValue("Kelas", data.data.Kelas);
          setValue("Materi", data.data.Materi || []);
          setValue("Posisi", data.data.Posisi);
        })
        .catch((err) => {
          console.error(err.message);
          toast.error("Failed to fetch data");
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data: SekolahFormData) => {
    try {
      if (!id) throw new Error("NIS tidak valid.");
      const success = await updateDataSekolah(id, data);

      toast.success(success.message, {
        onClose: () => {
          router.push(success.redirect);
        },
      });
    } catch (error) {
      console.error("Failed to update data", error);
      toast.error("Failed to update data");
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md">
      <div className="p-6 max-h-full overflow-y-auto">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-gray-900 text-lg font-semibold">
            Update Data Sekolah
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Nip"
            >
              NIP
            </label>
            <input
              disabled
              type="text"
              {...register("Nip", { required: true })}
              placeholder="Masukkan Nip "
              id="Nip"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Nuptk"
            >
              NUPTK
            </label>
            <input
              type="text"
              {...register("Nuptk")}
              placeholder="Masukkan NUPTK "
              id="Nuptk"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Nama"
            >
              Nama
            </label>
            <input
              type="text"
              {...register("Nama", { required: true })}
              placeholder="Masukkan Nama "
              id="Nama"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Posisi"
            >
              Posisi
            </label>
            <input
              type="text"
              {...register("Posisi", { required: true })}
              placeholder="Masukkan Posisi"
              id="Posisi"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {posisi === "Guru" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Kelas"
                >
                  Kelas
                </label>
                <input
                  type="text"
                  {...register("Kelas")}
                  placeholder="Masukkan Kelas"
                  id="Kelas"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Materi
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      {...register(`Materi.${index}` as const, {
                        required: true,
                      })}
                      placeholder={`Materi ${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append("")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Tambah Materi
                </button>
              </div>
            </>
          )}

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

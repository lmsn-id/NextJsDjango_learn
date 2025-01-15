import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useForm, useFieldArray } from "react-hook-form";

interface FormValues {
  Nuptk: string;
  Nip: string;
  Nama: string;
  Posisi: string;
  Kelas: string;
  Materi: { id: string; value: string; kelasMateri: string[] }[];
}

interface FormData {
  Question: string;
}

export const AddAkunSiswa = () => {
  const [FormData, setFormData] = useState({
    Nis: "",
    Nama: "",
    Jurusan: "",
    Kelas: "",
  });

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...FormData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !FormData.Nis ||
      !FormData.Nama ||
      !FormData.Jurusan ||
      !FormData.Kelas
    ) {
      toast.error("Tolong Masukkan NIS, Nama, Jurusan, dan Kelas");
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/addSiswa/`;

      const session = await getSession();
      if (!session?.accessToken) {
        throw new Error("Session invalid or missing access token");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(FormData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Siswa Berhasil Ditambahkan", {
          onClose: () => {
            router.push(data.redirect);
          },
        });
      } else {
        toast.error(data.message || "Siswa Gagal Ditambahkan");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Terjadi kesalahan saat menghubungi server");
    }
  };

  return {
    FormData,
    handleChange,
    handleSubmit,
  };
};

export const AddDataAkademik = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Nuptk: "",
      Nip: "",
      Nama: "",
      Posisi: "",
      Materi: [{ id: Date.now().toString(), value: "", kelasMateri: [] }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "Materi",
  });

  const posisi = watch("Posisi");

  const onSubmit = async (data: FormValues) => {
    console.log("Data Input", data);

    if (!data.Nuptk && !data.Nip) {
      toast.info("NUPTK atau NIP tidak boleh kosong");
      return;
    }

    if (!data.Nama || !data.Posisi) {
      toast.info("Data tidak boleh kosong");
      return;
    }

    if (
      data.Posisi === "Guru" &&
      data.Materi.some((materi) => !materi.value || !materi.kelasMateri.length)
    ) {
      toast.info("Materi dan kelas wajib diisi!");
      return;
    }

    try {
      const transformedMateri = data.Materi.map(({ ...rest }) => rest);

      const transformedData = {
        ...data,
        Materi: transformedMateri,
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/AddDataAkademik/`;

      const session = await getSession();
      if (!session?.accessToken) {
        throw new Error("Session invalid or missing access token");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(transformedData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Data berhasil ditambahkan", {
          onClose: () => {
            router.push(result.redirect);
          },
        });
      } else {
        toast.error(result.message || "Gagal menambahkan data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    fields,
    append,
    posisi,
  };
};

export const AddChatChatbot = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      Question: "",
    },
  });
  const router = useRouter();

  const handleTextareaInput = (Question: string) => {
    const textarea = document.getElementById("TextChat") as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.value = Question;
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const session = await getSession();
      if (!session || !session.accessToken) {
        throw new Error(
          "User is not authenticated or session is missing accessToken"
        );
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/AddChat/`;

      // Perbaikan payload sesuai ekspektasi backend
      const payload = {
        Question: { question: [data.Question] },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Chat Berhasil Ditambahkan", {
          onClose: () => {
            router.push(result.redirect);
          },
        });
      } else {
        toast.error(result.message || "Chat Gagal Ditambahkan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    handleTextareaInput,
  };
};

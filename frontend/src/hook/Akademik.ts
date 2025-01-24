import { useState, useEffect, useCallback } from "react";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface SiswaData {
  Nama: string;
  Nis: string;
  Kelas: string;
  Jurusan: string;
  Status: string;
}

interface AkademikData {
  Materi: Array<{ kelasMateri: string[]; value: string }>;
}

export const useGetUserAkademik = () => {
  const [FormAkademik, setFormAkademik] = useState({
    Nip: "",
    Nuptk: "",
    Nama: "",
    Posisi: "",
  });

  const { data: session } = useSession();
  const username = session?.user?.username;

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      try {
        const session = await getSession();

        if (!session || !session.accessToken) {
          throw new Error(
            "User is not authenticated or session is missing accessToken"
          );
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}/GetUserAkademik/${username}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setFormAkademik(result.data);
        } else {
          toast.error("Error fetching data");
        }
      } catch {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [username]);

  return {
    FormAkademik,
  };
};

export const GetDataSiswaAkademik = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [siswa, setSiswa] = useState<SiswaData[]>();
  const [classOptions, setClassOptions] = useState<
    Array<{ value: string; kelasMateri: string[] }>
  >([]);
  const [selectedClassInfo, setSelectedClassInfo] = useState<string>("");
  const { data: session } = useSession();
  const [DataAkademik, setDataAkademik] = useState<AkademikData | null>(null);
  const username = session?.user?.username;

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedClass(selectedValue);

    const classData = classOptions.find((option) =>
      option.kelasMateri.includes(selectedValue)
    );
    setSelectedClassInfo(classData?.value || "");
  };

  const GetDataSiswaKelas = useCallback(async () => {
    try {
      if (!selectedClass) return null;

      const session = await getSession();
      if (!session || !session.accessToken) {
        throw new Error(
          "User is not authenticated or session is missing accessToken"
        );
      }

      const formattedClass = encodeURIComponent(selectedClass);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/GetSiswa/${formattedClass}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse?.error === "not_found") {
          toast.info(errorResponse.message || "Data siswa tidak ditemukan");
          return null;
        }
        throw new Error(errorResponse.message || "Failed to fetch data");
      }
      const result = await response.json();
      setSiswa(result?.data || []);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Terjadi kesalahan");
    }
  }, [selectedClass]);

  const GetDataJurusanAkademik = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || !session.accessToken) {
        throw new Error(
          "User is not authenticated or session is missing accessToken"
        );
      }
      const url = `${process.env.NEXT_PUBLIC_API_URL}/GetUserAkademik/${username}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      toast.error("Error fetching data");
      throw error;
    }
  }, [username]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const result = await GetDataJurusanAkademik();
        const kelasMateri = result.data?.Materi || [];
        setClassOptions(kelasMateri);

        if (!selectedClass && kelasMateri.length > 0) {
          const defaultClass = kelasMateri[0].kelasMateri[0];
          setSelectedClass(defaultClass);
          setSelectedClassInfo(kelasMateri[0].value);
        }

        setDataAkademik(result.data);
      } catch (error) {
        toast.error("Error fetching data");
        console.error(error);
      }
    };

    fetchData();
  }, [username, GetDataJurusanAkademik, selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      GetDataSiswaKelas();
    }
  }, [selectedClass, GetDataSiswaKelas]);

  return {
    DataAkademik,
    selectedClass,
    classOptions,
    selectedClassInfo,
    setSelectedClass,
    handleClassChange,
    siswa,
  };
};

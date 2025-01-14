"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const useLoginSuperAdmin = () => {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...FormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!FormData.username || !FormData.password) {
      toast.error("Tolong Masukkan Username dan Password");
      return;
    }

    if (!FormData.remember) {
      toast.info("Tolong Aktifkan Tombol Remember");
      return;
    }

    try {
      const response = await signIn("credentials", {
        username: FormData.username,
        password: FormData.password,
        redirect: false,
      });

      if (response && response.error) {
        toast.error(response.error || "Gagal login");
        return;
      }

      const res = await fetch("/api/auth/session");
      if (!res.ok) {
        toast.error("Gagal mendapatkan sesi autentikasi");
        return;
      }
      const session = await res.json();

      if (session?.user?.is_superuser) {
        toast.success(session.user.message, {
          autoClose: 3000,
          onClose: () => router.push(session.user.redirect),
        });
      } else {
        toast.error("Login Gagal");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan saat login");
    }
  };

  return { handleChange, handleSubmit, FormData };
};

export const useLoginSiswa = () => {
  const router = useRouter();
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...FormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(FormData);

    if (!FormData.username || !FormData.password) {
      toast.error("Tolong Masukkan Username dan Password");
      return;
    }

    if (!FormData.remember) {
      toast.info("Tolong Aktifkan Tombol Remember");
      return;
    }

    try {
      const response = await signIn("credentials", {
        username: FormData.username,
        password: FormData.password,
        redirect: false,
      });

      if (response && response.error) {
        toast.error(response.error || "Gagal login");
        return;
      }

      const res = await fetch("/api/auth/session");
      if (!res.ok) {
        toast.error("Gagal mendapatkan sesi autentikasi");
        return;
      }
      const session = await res.json();

      if (session?.user) {
        toast.success(session.user.message, {
          autoClose: 3000,
          onClose: () => router.push(session.user.redirect),
        });
      } else {
        toast.error("Login Gagal");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan saat login");
    }
  };

  return {
    handleChange,
    handleSubmit,
    FormData,
  };
};

export const useLoginGuru = () => {
  const router = useRouter();
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...FormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!FormData.username || !FormData.password) {
      toast.error("Tolong Masukkan Username dan Password");
      return;
    }

    if (!FormData.remember) {
      toast.info("Tolong Aktifkan Tombol Remember");
      return;
    }

    try {
      const response = await signIn("credentials", {
        username: FormData.username,
        password: FormData.password,
        redirect: false,
      });

      if (response && response.error) {
        toast.error(response.error || "Gagal login");
        return;
      }

      const res = await fetch("/api/auth/session");
      if (!res.ok) {
        toast.error("Gagal mendapatkan sesi autentikasi");
        return;
      }
      const session = await res.json();

      if (session?.user) {
        toast.success(session.user.message, {
          autoClose: 3000,
          onClose: () => router.push(session.user.redirect),
        });
      } else {
        toast.error("Login Gagal");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan saat login");
    }
  };

  return {
    handleChange,
    handleSubmit,
    FormData,
  };
};

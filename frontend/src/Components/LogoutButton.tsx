"use client";

import React from "react";
import { useLogoutAdmin } from "@/hook/useLogout";

type LogoutButtonProps = {
  className?: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { handleLogout } = useLogoutAdmin();

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
}

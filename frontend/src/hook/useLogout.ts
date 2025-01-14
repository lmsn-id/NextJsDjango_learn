import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const useLogoutAdmin = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      const refreshToken = session?.refreshToken;
      if (!refreshToken) {
        toast.error("No refresh token found");
        throw new Error("No refresh token found");
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/logout/`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          "Logout failed: " + errorData.message || "Unexpected error"
        );
        throw new Error("Error during logout on backend");
      }

      const data = await response.json();

      toast.success(data.message, {
        onClose: async () => {
          await signOut({ callbackUrl: "/" });
        },
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    handleLogout,
  };
};

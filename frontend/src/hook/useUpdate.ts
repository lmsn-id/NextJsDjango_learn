import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  id: string;
  question: string;
  Question?: {
    question: string[];
  };
}

export const UpdateChatBot = () => {
  const { register, setValue, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname ? pathname.split("/").pop() : "";

  const handleTextareaInput = (text: string) => {
    const textarea = document.getElementById(
      "QuestionChat"
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.value = text;
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  async function getDataChat(id: string) {
    const session = await getSession();
    if (!session || !session.accessToken) {
      throw new Error(
        "User is not authenticated or session is missing accessToken"
      );
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/UpdateDataChat/${id}`;
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

  async function updateDataChat(id: string, data: FormData) {
    const session = await getSession();
    if (!session || !session.accessToken) {
      throw new Error(
        "User is not authenticated or session is missing accessToken"
      );
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/UpdateDataChat/${id}`;
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
  useEffect(() => {
    if (!id) {
      console.error("ID is missing from the URL");
      toast.error("ID is missing from the URL");
      return;
    }

    getDataChat(id)
      .then((data) => {
        const question =
          data.data.Question && Array.isArray(data.data.Question.question)
            ? data.data.Question.question[0]
            : "";

        setValue("question", question);
        handleTextareaInput(question);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch data");
      });
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!id) throw new Error("ID is missing");

      const payload = {
        id,
        question: JSON.stringify({
          question: [data.question],
        }),
      };

      console.log("data payload", payload);

      const success = await updateDataChat(id, payload);

      toast.success(success.message, {
        onClose: () => {
          router.push(success.redirect);
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update data");
    }
  };

  return {
    register,
    handleSubmit,
    handleTextareaInput,
    onSubmit,
  };
};

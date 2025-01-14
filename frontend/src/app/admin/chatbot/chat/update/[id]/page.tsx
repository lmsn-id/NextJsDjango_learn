"use client";
import { UpdateChatBot } from "@/hook/useUpdate";

export default function UpdateChat() {
  const { handleSubmit, register, onSubmit, handleTextareaInput } =
    UpdateChatBot();

  return (
    <>
      <div className="w-full h-full bg-white rounded-2xl shadow-md">
        <div className="p-6 max-h-full overflow-y-auto">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">
              Update Data ChatBot
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="QuestionChat"
              >
                Question
              </label>
              <textarea
                id="QuestionChat"
                onInput={(e) =>
                  handleTextareaInput((e.target as HTMLTextAreaElement).value)
                }
                {...register("question", { required: true })}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline resize-none"
                placeholder="Silahkan masukan pertanyaan"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md px-4 py-2 text-white font-semibold"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

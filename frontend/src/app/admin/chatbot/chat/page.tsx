"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetAllDataChatbot } from "@/hook/useGet";
import { useRouter } from "next/navigation";

export default function Chat() {
  const { data, handleDelete } = GetAllDataChatbot();
  const router = useRouter();

  const GetPage = usePathname();
  const BaseUrl = `${GetPage}`;

  const handleEdit = (id: string) => {
    console.log(id);
    router.push(`${BaseUrl}/update/${id}`);
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-md">
        <div className="p-6">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">Tabel Chat</h1>
          </div>

          <div className="header">
            <div className="w-full flex justify-end mb-4 items-center">
              <div className="add">
                <Link
                  href={`${BaseUrl}/add-chat`}
                  className="p-2 border rounded-lg bg-[#3a3086] text-white"
                >
                  Add Chat
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[465px] overflow-y-auto border-t border-gray-300">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 text-center w-5">
                    No
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center">
                    Text
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg w-1/2">
                      <div
                        className="max-h-24 overflow-y-auto p-2 rounded-md"
                        style={{ wordWrap: "break-word" }}
                      >
                        {typeof item.Question === "object" &&
                        Array.isArray(item.Question.question)
                          ? item.Question.question[0]
                          : typeof item.Question === "string"
                          ? item.Question
                          : ""}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg space-x-6">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-2 bg-blue-500 text-white rounded-lg"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";

type Message = {
  sender: string;
  content: string;
};

export default function ChatBoot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: userInput },
    ]);
    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sendMessage/`;
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
        body: JSON.stringify({
          Question: userInput,
        }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: "Terjadi kesalahan. Silakan coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-6 z-50 bg-[#5046a5] p-4 ${
        isChatOpen ? "rounded-xl" : "rounded-full"
      }`}
    >
      <div className="chatbot-container">
        <div
          className="chatbot-header cursor-pointer flex items-center justify-between text-white"
          onClick={toggleChat}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/operator.png"
              alt="Operator Icon"
              width={100}
              height={100}
              className="w-8 h-8 rounded-full"
            />
            <span
              className={`font-semibold ${isChatOpen ? "block" : "hidden"} `}
            >
              Hai, {session?.user?.username || "Unknown"}! Ada yang bisa saya
              bantu?
            </span>
          </div>
        </div>
        {isChatOpen && (
          <div className="chatbot-body bg-white border mt-2 p-4 rounded-md shadow-md">
            <div className="chat-messages h-60 overflow-y-auto space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 max-w-xs rounded-lg ${
                    msg.sender === "user"
                      ? "ml-auto bg-blue-500 text-white"
                      : "mr-auto bg-gray-200 text-gray-800"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="text-center text-gray-500">Mengetik...</div>
              )}
            </div>

            <form onSubmit={handleSend} className="mt-2">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ketik pesan..."
                className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring focus:border-blue-300 resize-none"
                rows={1}
                style={{ minHeight: "40px", maxHeight: "120px" }}
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isLoading}
              >
                Kirim
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ComponentIcon from "@/hook/icon";
import LogoutButton from "../LogoutButton";

export default function SidebarAdmin() {
  const { FaTv, FaUser, FaSignInAlt, FaUserTie, FaRobot } = ComponentIcon.fa;
  const { IoMdChatbubbles } = ComponentIcon.io;
  const { PiStudentFill } = ComponentIcon.pi;
  const { MdOutlineLastPage, MdCached } = ComponentIcon.md;
  const pathname = usePathname();
  const [openAccount, setopenAccount] = useState(false);
  const [openChatbot, setopenChatbot] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setopenAccount(false);
        setopenChatbot(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isActive = (path: string) => {
    return path === pathname;
  };

  return (
    <>
      <aside className="fixed inset-y-0 p-0 my-4 overflow-hidden transition-transform duration-200 -translate-x-full bg-white shadow-xl dark:bg-slate-850 max-w-64 z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0">
        <div className="h-19">
          <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
          <Link
            className="block px-8 py-6 m-0 text-lg font-semibold text-slate-700"
            href="/"
          >
            Admin SMKN 5
          </Link>
        </div>

        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

        <div className="flex flex-col justify-between h-[calc(100%-5rem)]">
          <div className="grow overflow-y-auto px-2">
            <ul className="flex flex-col pl-0 mb-0 mt-4">
              <li className="mt-0.5 w-full">
                <Link
                  className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:bg-gray-300 ${
                    isActive("/admin")
                      ? "bg-gray-300 text-white"
                      : "bg-blue-500/13 text-slate-700"
                  }`}
                  href="/admin"
                >
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                    <FaTv className="text-blue-500 text-xl flex-shrink-0" />
                  </div>
                  Dashboard
                </Link>
              </li>

              <li className="mt-0.5 w-full">
                <button
                  className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg ps-4 pe-2 font-semibold transition-colors hover:bg-gray-300 w-full ${
                    isActive("/admin/akun")
                      ? "bg-gray-300 text-white"
                      : "bg-blue-500/13 text-slate-700"
                  }`}
                  onClick={() => setopenAccount(!openAccount)}
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                        <FaUser className="text-blue-500 text-xl flex-shrink-0" />
                      </div>
                      Account
                    </div>
                    <MdOutlineLastPage
                      className={`text-blue-500 text-2xl transform duration-300 ease-in-out ${
                        openAccount ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {openAccount && (
                  <div
                    className={`transition-all snap-y bg-gray-200 rounded-lg mx-5 duration-500 ease-in-out overflow-hidden ${
                      openAccount ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="flex flex-col pl-0 mb-0" ref={dropdownRef}>
                      <li className="mt-0.5 w-full">
                        <Link
                          className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:bg-gray-300 ${
                            isActive("/admin/akun/siswa")
                              ? "bg-gray-300 text-white"
                              : "bg-blue-500/13 text-slate-700"
                          }`}
                          href="/admin/akun/siswa"
                        >
                          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                            <PiStudentFill className="text-blue-500 text-xl flex-shrink-0" />
                          </div>
                          Akun Siswa
                        </Link>
                      </li>
                      <li className="mt-0.5 w-full">
                        <Link
                          className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:bg-gray-300 ${
                            isActive("/admin/akun/akademik")
                              ? "bg-gray-300 text-white"
                              : "bg-blue-500/13 text-slate-700"
                          }`}
                          href="/admin/akun/akademik"
                        >
                          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                            <FaUserTie className="text-blue-500 text-xl flex-shrink-0" />
                          </div>
                          Akun Akademik
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="mt-0.5 w-full">
                <button
                  className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg ps-4 pe-2 font-semibold transition-colors hover:bg-gray-300 w-full ${
                    isActive("/admin/chatbot")
                      ? "bg-gray-300 text-white"
                      : "bg-blue-500/13 text-slate-700"
                  }`}
                  onClick={() => setopenChatbot(!openChatbot)}
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                        <FaRobot className="text-blue-500 text-xl flex-shrink-0" />
                      </div>
                      Chatbot
                    </div>
                    <MdOutlineLastPage
                      className={`text-blue-500 text-2xl transform duration-300 ease-in-out ${
                        openChatbot ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {openChatbot && (
                  <div
                    className={`transition-all snap-y bg-gray-200 rounded-lg mx-5 duration-500 ease-in-out overflow-hidden ${
                      openChatbot ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="flex flex-col pl-0 mb-0" ref={dropdownRef}>
                      <li className="mt-0.5 w-full">
                        <Link
                          className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:bg-gray-300 ${
                            isActive("/admin/chatbot/chat")
                              ? "bg-gray-300 text-white"
                              : "bg-blue-500/13 text-slate-700"
                          }`}
                          href="/admin/chatbot/chat"
                        >
                          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                            <IoMdChatbubbles className="text-blue-500 text-xl flex-shrink-0" />
                          </div>
                          Chat
                        </Link>
                      </li>
                      <li className="mt-0.5 w-full">
                        <Link
                          className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:bg-gray-300 ${
                            isActive("/admin/chatbot/cache")
                              ? "bg-gray-300 text-white"
                              : "bg-blue-500/13 text-slate-700"
                          }`}
                          href="/admin/chatbot/cache"
                        >
                          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                            <MdCached className="text-blue-500 text-xl flex-shrink-0" />
                          </div>
                          Cahce Chat
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="px-4 pb-4">
            <h6 className="text-xs font-bold leading-tight uppercase opacity-60 mb-2">
              Account pages
            </h6>
            <ul className="flex flex-col pl-0 mb-0">
              <li className="mt-0.5 w-full">
                <Link
                  className={`py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:bg-gray-300 ${
                    isActive("/admin/profile")
                      ? "bg-gray-300 text-white"
                      : "bg-blue-500/13 text-slate-700"
                  }`}
                  href="/admin/profile"
                >
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                    <FaUser className="text-slate-700 text-xl" />
                  </div>
                  Profile
                </Link>
              </li>

              <li className="mt-0.5 w-full">
                <div className="py-3 text-lg ease-nav-brand flex items-center whitespace-nowrap rounded-lg px-4 transition-colors hover:bg-gray-300">
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center text-center xl:p-2.5">
                    <FaSignInAlt className="text-orange-500 text-xl" />
                  </div>
                  <LogoutButton className="w-full text-start" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

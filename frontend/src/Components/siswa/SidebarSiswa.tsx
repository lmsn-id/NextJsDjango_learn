"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUserGraduate } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import ComponentIcon from "@/hook/icon";
import { usePathname } from "next/navigation";
import LogoutButton from "../LogoutButton";
import { useGetDataLearning } from "@/hook/useGet";

export default function SidebarSiswa({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseurl = () => "/e-learning";

  const { MdOutlineDashboard } = ComponentIcon.md;
  const { HiMenuAlt3 } = ComponentIcon.hi;
  const { RiSettings4Line } = ComponentIcon.ri;
  const { TbReportAnalytics } = ComponentIcon.tb;
  const pathname = usePathname();
  const { FormSiswa } = useGetDataLearning();

  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === `${baseurl()}/` && pathname === baseurl()) {
      return true;
    }
    return path === pathname;
  };

  const menus = [
    { name: "Dashboard", link: `${baseurl()}/`, icon: MdOutlineDashboard },
    {
      name: "Biodata",
      link: `${baseurl()}/biodata`,
      icon: BsFillSuitcaseLgFill,
    },
    { name: "Rapot", link: `${baseurl()}/rapot`, icon: TbReportAnalytics },
    {
      name: "Materi & Tugas",
      link: `${baseurl()}/materi-tugas`,
      icon: IoLibraryOutline,
      margin: true,
    },
    { name: "Setting", link: `${baseurl()}/setting`, icon: RiSettings4Line },
  ];

  return (
    <main className="flex relative m-0 font-sans antialiased font-normal text-lg leading-default bg-gray-200 text-slate-500 h-screen overflow-hidden">
      <aside
        className={`bg-gray-100 min-h-screen shadow-lg mt-16 md:mt-0 ${
          open
            ? " translate-x-0 w-56 md:w-72"
            : "-translate-x-16 md:translate-x-0 w-16"
        } duration-500 text-gray-600 px-4 fixed z-50 md:relative md:z-auto`}
      >
        <div className="py-3 flex justify-center items-center">
          <div
            style={{ transitionDelay: `300ms` }}
            className={`whitespace-pre duration-500 flex flex-col items-center gap-5 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            <Link href="/">
              <Image
                width={100}
                height={100}
                src="/LOGO-NEW-SMKN5.png"
                className="w-10"
                alt="Logo SMKN 5"
              />
            </Link>
            <h2>SMKN 5 Kab Tangerang</h2>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative transition-all duration-500 snap-y">
          {menus.map((menu, i) => (
            <Link
              href={menu.link}
              key={i}
              className={`${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                isActive(menu.link)
                  ? "bg-gray-300 text-gray-900"
                  : "hover:bg-gray-300"
              }`}
            >
              <div className="w-5 h-5">{React.createElement(menu.icon)}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </aside>
      <div className="flex w-full h-full">
        <section className="flex-grow overflow-auto">
          <nav className="bg-gray-100 shadow-lg w-full">
            <ul className="flex items-center md:flex-row-reverse justify-between p-3 text-gray-600">
              <li className="text-sm md:mx-20 flex justify-center items-center gap-5 relative">
                <div className="bg-green-600 rounded-full p-2">
                  <FaUserGraduate className=" text-white" size={25} />
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div>
                    <h4 className="font-semibold">{FormSiswa.Nama}</h4>
                    <div className="flex gap-1">
                      <p className="text-xs">{FormSiswa.Kelas}</p>
                      <p className="text-xs">{FormSiswa.Jurusan}</p>
                    </div>
                  </div>
                  <IoIosArrowForward
                    className={`${
                      dropdownOpen
                        ? "rotate-90 duration-200"
                        : "rotate-0 duration-200"
                    }`}
                    size={18}
                  />
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-14 left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded shadow-md z-50"
                  >
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                    <ul className="text-sm text-gray-800">
                      <li className="border-b">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <div className="flex px-4 py-2 hover:bg-gray-100 font-semibold">
                          <LogoutButton className="w-full text-start" />
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="text-lg font-semibold">
                <HiMenuAlt3
                  className={`cursor-pointer transition-all duration-500 ${
                    open ? "text-2xl" : "text-xl"
                  } `}
                  onClick={() => setOpen(!open)}
                />
              </li>
            </ul>
          </nav>
          {children}
        </section>
      </div>
    </main>
  );
}

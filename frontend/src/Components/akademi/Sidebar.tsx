"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useGetUserAkademik } from "@/hook/useGet";
import LogoutButton from "../LogoutButton";

export default function SidebarAkademik({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseurl = () => "/akademik";
  const menus = [
    { name: "Dashboard", link: `${baseurl()}/`, icon: MdOutlineDashboard },
    { name: "User", link: "/", icon: AiOutlineUser },
    { name: "Messages", link: "/", icon: FiMessageSquare },
    { name: "Analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];

  const { FormAkademik } = useGetUserAkademik();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleClickOutside2 = (event: MouseEvent) => {
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target as Node)
      ) {
        setDropdownOpen2(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside2);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === `${baseurl()}/` && pathname === baseurl()) {
      return true;
    }
    return path === pathname;
  };

  const handleDropdownClick2 = () => {
    if (!open) {
      setOpen(true);
      setTimeout(() => setDropdownOpen2(true), 300); 
    } else {
      setDropdownOpen2(!dropdownOpen2);
    }
  };

  return (
    <>
      <aside
        className={`bg-gray-100 min-h-screen ${open ? "w-72" : "w-16"} ${
          isMobile ? "fixed z-50" : "relative"
        } ${
          open && isMobile
            ? "translate-x-0 w-52"
            : isMobile
            ? "-translate-x-full"
            : ""
        } transition-all duration-500 shadow-xl text-gray-600 p-2 md:p-4`}
      >
        <div className="flex flex-col justify-between h-full">
          <section>
            <div
              style={{ transitionDelay: `300ms` }}
              className={`whitespace-pre duration-500 gap-5 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              <Link href="/" className={`flex items-center flex-col gap-2`}>
                <Image
                  width={100}
                  height={100}
                  src="/LOGO-NEW-SMKN5.png"
                  className="w-10"
                  alt="Logo SMKN 5"
                />
                <h2>SMKN 5 Kab Tangerang</h2>
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-4 relative">
              {menus?.map((menu, i) => (
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
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ))}
            </div>
          </section>

          <div
            className={` ${isMobile ? "fixed left-0 w-full" : ""} bg-white`}
            style={{ bottom: isMobile ? "0" : "auto" }}
          >
            <div
              className={`flex flex-col items-start text-sm font-medium  hover:bg-gray-300 rounded-md cursor-pointer ${
                open ? "gap-3.5 p-2" : "justify-center"
              }`}
            >
              <div
                className="flex justify-between gap-1 items-center w-full"
                onClick={handleDropdownClick2}
              >
                <div className="flex gap-3 items-center">
                  <div className="bg-green-600 rounded-full p-2">
                    <FaUserTie className="text-white" size={20} />
                  </div>
                  {open && (
                    <div
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      <h2 className="text-gray-900">{FormAkademik.Nama}</h2>
                      <p>{FormAkademik.Posisi}</p>
                    </div>
                  )}
                </div>

                {open && (
                  <IoIosArrowForward
                    className={`${
                      dropdownOpen2
                        ? "rotate-90 duration-200"
                        : "rotate-0 duration-200"
                    }`}
                    size={18}
                  />
                )}
              </div>

              {dropdownOpen2 && (
                <div
                  className={`flex flex-col mt-2 transition-transform duration-300 ${
                    dropdownOpen2 ? "translate-x-0" : "translate-x-full"
                  } w-full bg-white rounded shadow-md z-50`}
                  ref={dropdownRef2}
                >
                  <ul className="text-sm text-gray-800 w-full">
                    <li className="border-b hover:bg-gray-100">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-400 font-semibold"
                      >
                        Profile
                      </Link>
                    </li>

                    <LogoutButton className="w-full text-start px-4 py-2 hover:bg-gray-400 font-semibold" />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="w-full min-h-screen bg-gray-100">
        <nav className="bg-gray-100 shadow-lg  px-4 py-3 ">
          <ul className="flex items-center justify-between md:flex-row-reverse">
            <li className="text-sm md:mx-20 flex justify-center items-center gap-5 relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="bg-green-600 rounded-full p-2">
                  <FaUserTie className=" text-white" size={25} />
                </div>
                <div>
                  <h4 className="font-semibold">{FormAkademik.Nama}</h4>
                  <div className="flex gap-1">
                    <p className="text-xs">{FormAkademik.Posisi}</p>
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
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </li>
          </ul>
        </nav>

        <div className="m-3 mx-12 text-xl">{children}</div>
      </div>

      {open && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}

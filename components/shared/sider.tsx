"use client";

import React, { useState } from "react";

import { RxCross2 } from "react-icons/rx";

import BgImage from "../../public/assets/background.png";
import Logo from "../../public/assets/logo.png";
import Cross from "../../public/assets/cross.png";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setOpenSider } from "@/redux/slices/generalSlice";
import AppLogo from "./app-logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useVEOContext } from "@/providers/veo-context";

const observerLinks = [
  { text: "Home", href: "/observer/" },
  { text: "Survey", href: "/observer/surveys/" },
  { text: "Account Settings", href: "/observer/settings/" },
];

const adminLinks = [
  { text: "Home", href: "/admin/" },
  { text: "User Management ", href: "/admin/usermanagement/" },
  { text: "Election Results", href: "/admin/electionresults/" },
  {
    text: "Survey",
    href: "/admin/survey/",
  },
  { text: "Complete Survey", href: "/admin/survey/" },
  { text: "Analyze Survey Results ", href: "/admin/survey/analyze/" },
  { text: "Manage Surveys", href: "/admin/survey/manage/" },
  { text: "Audit Logs", href: "/admin/auditlogs/" },
  { text: "Account Settings", href: "/admin/settings/" },
];

const DrawerComp = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { role } = useAppSelector((state) => state.user);

  console.log("role", role);

  const { setSelectedSurvey } = useVEOContext();
  const { openSider } = useAppSelector((state) => state.general);
  const [activeTab, setTabActive] = useState("collection");

  const localRoleObserver =
    typeof window !== "undefined" &&
    localStorage.getItem("user_role") == "observer"
      ? localStorage.getItem("user_role") == "observer"
      : false;

  const localRoleAdmin =
    typeof window !== "undefined" &&
    localStorage.getItem("user_role") == "admin"
      ? localStorage.getItem("user_role") == "admin"
      : false;

  return (
    <>
      <main
        className={
          "lg:hidden fixed overflow-hidden z-40 inset-0 transform ease-in-out " +
          (openSider
            ? " transition-opacity duration-500 translate-appx-0  "
            : " transition-all delay-500 translate-x-full")
        }
      >
        <section
          className={
            "w-screen right-0 absolute h-screen shadow-xl duration-500 ease-in-out transition-all transform bg-white" +
            (openSider ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <div className="relative w-screen pb-10 px-10 flex flex-col items-center gap-y-6 h-full">
            {/* Header */}
            <div className="w-full h-[12vh] flex items-center justify-between">
              <div className="flex items-center justify-between w-full h-full">
                <AppLogo />

                <div className="sm:hidden flex">
                  <RxCross2
                    className="text-[#111111] text-[28px] cursor-pointer"
                    onClick={() => dispatch(setOpenSider(false))}
                  />
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div className="flex flex-col items-start gap-y-4 w-full">
              {(role ? role === "observer" : localRoleObserver) == true &&
                observerLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className={cn(
                      "text-primary-cDark65 font-jost text-[16px] hover:text-primary-cGreen74 hover:font-bold duration-300",
                      // pathname.startsWith(link.href) &&
                      pathname === link.href &&
                        "text-primary-cGreen74 font-bold"
                    )}
                    onClick={() => {
                      if (link?.text === "Home") {
                        setSelectedSurvey(null);
                      }
                      dispatch(setOpenSider(false));
                    }}
                  >
                    {link.text}
                  </Link>
                ))}

              {(role ? role === "admin" : localRoleAdmin) == true &&
                  adminLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className={cn(
                        "text-primary-cDark65 font-jost text-[16px] hover:text-primary-cGreen74 hover:font-bold duration-300",
                        // pathname.startsWith(link.href) &&
                        pathname === link.href &&
                          "text-primary-cGreen74 font-bold"
                      )}
                      onClick={() => {
                        if (link?.text === "Home") {
                          setSelectedSurvey(null);
                        }
                        dispatch(setOpenSider(false));
                      }}
                    >
                      {link.text}
                    </Link>
                  ))}
            </div>

            <button
              className="left-10 absolute bottom-10 text-primary-cDark65 font-jost text-[16px] hover:text-primary-cGreen74 hover:font-bold duration-300"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                router.push("/auth/login");
                dispatch(setOpenSider(false));
              }}
            >
              Log out
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default DrawerComp;

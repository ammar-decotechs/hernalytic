"use client"

import Image from "next/image";

import { GiHamburgerMenu } from "react-icons/gi";

import AppLogo from "@/components/shared/app-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import HeaderDropdown from "./header-drop-down";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenSider } from "@/redux/slices/generalSlice";

export default function DashboardHeader(): React.JSX.Element {
  const dispatch = useAppDispatch()
  return (
    <header className="bg-white text-white h-[60px] sm:h-20 px-8 lg:px-20 border-b">
      <div className="flex items-center justify-between w-full h-full">
        <AppLogo />

        <div className="hidden sm:flex items-center gap-5">
          <div className="flex items-center rounded-[40px] p-2 gap-2 bg-primary-cLightF1">
            <Image
              src="/flags/nigeria.svg"
              alt="nigeria flag"
              width={20}
              height={20}
            />
            <p className="text-primary-cDark65">NG</p>
          </div>
          <HeaderDropdown />
          {/* <div className="flex items-center gap-2 cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CJ</AvatarFallback>
            </Avatar>
            <IoMdArrowDropdown size={22} className="text-primary-cDark65" />
          </div> */}
        </div>

        <div className="sm:hidden flex">
          <GiHamburgerMenu className="text-[#111111] text-[20px] cursor-pointer" onClick={() => dispatch(setOpenSider(true))} />
        </div>
      </div>
    </header>
  );
}

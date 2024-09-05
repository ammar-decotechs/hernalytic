"use client";

import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { RxExit } from "react-icons/rx";
import { ChevronDown } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVEOContext } from "@/providers/veo-context";

export default function HeaderDropdown() {
  const router = useRouter();
  const { setSelectedSurvey } = useVEOContext();
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 bg-transparent py-1.5 px-3 text-[16px] font-normal text-primary-cDark1D focus:outline-none">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CJ</AvatarFallback>
          </Avatar>
          <IoMdArrowDropdown size={22} className="text-primary-cDark65" />
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-[3px] bg-white p-1 text-[16px] text-primary-cGreen4D shadow-[0_11px_22px_0px_rgba(0,0,0,0.1)] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/10"
            onClick={() => {
              setSelectedSurvey(null);
              router.push("/observer");
            }}
          >
            Dashboard
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/10"
            onClick={() => router.push("/observer/surveys")}
          >
            Survey
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/10"
            onClick={() => router.push("/observer/settings")}
          >
            Account Settings
          </button>
        </MenuItem>

        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 text-[#747878]"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              Cookies.remove('token');
              Cookies.remove('user_role');
              Cookies.remove('name');
              toast.success("logout Successfully")
              router.push("/auth/login");
            }}
          >
            <RxExit />
            Sign Out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

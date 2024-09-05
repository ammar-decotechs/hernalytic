import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useVEOContext } from "@/providers/veo-context";
import { useAppSelector } from "@/redux/hooks";
import { setOpen } from "@/redux/slices/generalSlice";


export default function Modal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const { open } = useAppSelector((state)=>state.general);
console.log("openmodal", open)
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-[8px] bg-white text-left shadow-[0_0_14px_5px_rgba(0,0,0,0.1)] transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

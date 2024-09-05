"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function SwitchToggle({id, defaultValue ,switchHandler}:any): React.ReactNode {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <Switch
      checked={enabled}
      onChange={(event)=>{
        switchHandler(id, event)
        setEnabled(event)
      }}
      className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-primary-cGreyE9 border-2 border-primary-cGrey7E p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:border-primary-cGreen74 data-[checked]:bg-primary-cGreen74"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-[16px] -translate-x-0.5 -translate-y-[2px] rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6"
      />
    </Switch>
  );
}

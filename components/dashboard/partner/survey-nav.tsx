"use client"

import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
    { text: "Complete Survey", href: "/partner/survey/" },
    { text: "Survey Results ", href: "/partner/survey/result/", secondaryLink : ["/partner/survey/graphicalRepresentation/"] },
    // { text: "Manage Surveys", href: "/admin/survey/manage/" },
  ];


export default function PartnerSurveyNav():React.ReactNode {
    const pathname = usePathname() 
  return (
    <nav className="bg-white text-white py-5 px-8 lg:px-20">
      <div className="flex items-center justify-between w-full h-full overflow-x-auto no_scrollbar">
        <div className="flex items-center gap-12 ">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                "text-primary-cDark65 font-jost w-max text-base hover:text-primary-cGreen74 hover:font-bold duration-300",
                // pathname.startsWith(link.href) &&
                link?.secondaryLink
                  ? link?.secondaryLink.includes(pathname) && "text-primary-cGreen74 font-bold border-b-[3px] border-primary-cGreen74" : pathname === link.href &&
                  "text-primary-cGreen74 font-bold border-b-[3px] border-primary-cGreen74"
              )}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

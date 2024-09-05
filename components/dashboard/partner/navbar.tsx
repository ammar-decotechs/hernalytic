"use client";

import { usePathname } from "next/navigation";
import RoleIndicator from "../role-indicator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { text: "Home", href: "/partner/" },
//   { text: "User Management ", href: "/partner/usermanagement/" },
//   { text: "Election Results", href: "/partner/electionresults/" },
  {
    text: "Survey",
    href: "/partner/survey/",
    secondaryLink: [
      "/partner/survey/",
      "/partner/survey/CompleteSurvey/",
      "/partner/survey/SurveyResults/",
    ],
  },
//   { text: "Audit Logs", href: "/admin/auditlogs/" },
  { text: "Account Settings", href: "/partner/settings/" },
];

export default function PartnerNav(): React.JSX.Element {
  const pathname = usePathname();
  return (
    <nav className="hidden sm:block bg-white text-white py-5 px-8 lg:px-20 border-b  ">
      <div className="flex items-center justify-between w-full h-full overflow-x-auto no_scrollbar">
        <div className="flex items-center gap-12 ">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                "text-primary-cDark65 font-jost w-max text-base hover:text-primary-cGreen74 hover:font-bold duration-300",
                link?.secondaryLink
                  ? link?.secondaryLink.includes(pathname) &&
                      "text-primary-cGreen74 font-bold"
                  : pathname === link.href && "text-primary-cGreen74 font-bold"
              )}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <RoleIndicator />
      </div>
    </nav>
  );
}

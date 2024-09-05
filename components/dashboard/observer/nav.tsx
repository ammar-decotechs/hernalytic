"use client";

import { usePathname } from "next/navigation";
import RoleIndicator from "../role-indicator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useVEOContext } from "@/providers/veo-context";

const links = [
  { text: "Home", href: "/observer/" },
  { text: "Survey", href: "/observer/surveys/" },
  { text: "Account Settings", href: "/observer/settings/" },
];

export default function ObserverNav(): React.JSX.Element {
  const { setSelectedSurvey } = useVEOContext();
  const pathname = usePathname();
  return (
    <nav className="hidden sm:block bg-white text-white py-5 px-8 lg:px-20 border-b">
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex items-center gap-12">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                "text-primary-cDark65 font-jost text-base hover:text-primary-cGreen74 hover:font-bold duration-300",
                // pathname.startsWith(link.href) &&
                pathname === link.href && "text-primary-cGreen74 font-bold"
              )}
              onClick={() => {
                if (link?.text === "Home") {
                  setSelectedSurvey(null);
                }
              }}
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

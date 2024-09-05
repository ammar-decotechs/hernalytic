import AuthHeader from "@/components/auth/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Hernalytics",
  description: "Hernalytics VEO Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthHeader />
      <main className="px-[13px]"> {children}</main>
    </div>
  );
}

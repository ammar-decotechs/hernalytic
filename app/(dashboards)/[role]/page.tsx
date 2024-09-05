import Admin from "@/components/dashboard/admin/home";
import Observer from "@/components/dashboard/observer";
import Partner from "@/components/dashboard/partner";

interface PageProps {
  params: {
    role: "observer" | "super-user" | "admin" | "partner";
  };
}

export default function Page({ params }: PageProps): React.ReactNode {
  return <>{params.role === "observer" && <Observer />}{params.role === "admin" && <Admin />} {params.role === "partner" && <Partner />}</>;
}


export async function generateStaticParams() {
  return [
    { role: "observer" },
    { role: "super-user" },
    { role: "admin" },
    { role: "partner" },
  ];
}
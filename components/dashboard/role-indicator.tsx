import { useAppSelector } from "@/redux/hooks";

// {role}: {role: "observer" | "super-user" | "admin" | "partner";}

export default function RoleIndicator() {
    const {role} = useAppSelector((state) => state.user)

  return (
    <div className="w-fit bg-primary-cBlue6F px-2 py-1 text-white text-[10px] leading-tight rounded uppercase">
      <span>{role ? role : typeof window !== "undefined" && localStorage.getItem("user_role")}</span>
    </div>
  );
}

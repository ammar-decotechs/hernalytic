'use client'
import DashboardHeader from "@/components/dashboard/header";
import VEOHeader from "@/components/shared/header";
import DrawerComp from "@/components/shared/sider";
import VEOProvider from "@/providers/veo-context";
import type { Metadata } from "next";
import { useRouter } from 'next/navigation';
import { NextResponse } from "next/server";
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title: "VEO | Hernalytics",
//   description: "Hernalytics VEO Platform",
// };


export default function VEOLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const router = useRouter();


  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('token');
      if(!token){
        router.push('/auth/login');
      }
    }
  },[])
  

  return (
    <VEOProvider>
      <div>
        <DashboardHeader />
        <main> {children}</main>
        <DrawerComp/>
      </div>
    </VEOProvider>
  );
}

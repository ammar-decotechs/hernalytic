import React from "react";

import { Camera } from "lucide-react";
import PartnerDetailsForm from "./partner-details-form"
import Footer from "../footer"
import MeshBg from "../../../../public/images/setting_mesh_bg.png";
import PartnerNav from "../navbar";
import Image from "next/image";

export default function PartnerSettings() {
  return (
    <>
      <PartnerNav />

      <div className="pt-5 pb-5 px-8 lg:px-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-y-2">
            <p className="text-[26px] text-primary-cBlue73 font-semibold">
              Account Settings
            </p>
            {/* <p className="text-[13px] text-primary-cDark1E">
              Dignissim dui tincidunt pellentesque
            </p> */}
          </div>
        </div>
      </div>

      <div className="relative flex justify-center w-full h-40 bg-setting-mesh-bg-gradient">
        <Image src={MeshBg} alt="mesh_bg" layout="fill" objectFit="cover" />
        <div className="w-40 h-40 absolute -bottom-[50%] flex items-center justify-center rounded-full border-[6px] border-white bg-primary-cDark42">
          <div className="w-max p-3 flex items-center justify-center bg-[#191C1E] rounded-full">
            <Camera className="w-10 h-auto text-primary-cBlueD1" />
          </div>
        </div>
      </div>


      <PartnerDetailsForm />

      <Footer/>
    </>
  );
}

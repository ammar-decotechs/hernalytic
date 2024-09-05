"use client";

import UploaSuccess from "./upload-success";
import UploadError from "./upload-error";
import React, { useState, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { FaRegFileImage } from "react-icons/fa";
import LoaderComp from "./loader-comp";

export default function Upload() {
  const fileInputRef:any = useRef(null);
  const [upload, setUpload] = useState(false);
  const [uploaderror, setUploaderror] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [userState, setUserState] = useState({
    images: [],
  });

console.log("files",userState)

  const handleButtonClick = () => {
    setUpload(false);
    fileInputRef.current?.click();
  };

 
  const uploadHandles = () => {
    setLoader(true); 
    setUserState({
    images: [],
  }) 
  
  
    setTimeout(() => {
      setLoader(false); 
      setUpload(true);
    }, 3000);
  };

  const handleImageChange = async (e:any) => {
    const files = e.target.files;
    console.log("image", files)
    const newImages:any = [...userState.images];
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
        formData.append("upload_preset", "czpq5gys");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dxbftjr13/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }

            const data = await response.json();
            const imageUrl = data.secure_url;
            const fileSizeInMB = (files[i].size / (1024 * 1024)).toFixed(3);
            newImages.push({ url: imageUrl, name: files[i].name, size: `${fileSizeInMB} ` });
            

        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            setUploaderror(true); 
            setLoader(false); 
        }
    }


    setUserState({
        images: newImages,
    });
};

  const handleCancel = () => {
    setUserState({
      images: [],
    });
    setUpload(false); // Reset upload state on cancel
    setUploaderror(false); // Reset error state on cancel
  };

  return (
    <div className="container mx-auto md:p-4 p-1  w-full">
      <div className="md:w-[600px] w-full  mx-auto my-5">
        <h2 className="text-[16px] font-[500] text-primary-cDark1D my-5">
          Upload Results
        </h2>

        <div className="flex flex-col items-center justify-center w-full">
          {/* Upload Section */}
          <div
            className={`flex ${
              userState.images.length > 0
                ? "flex-col justify-center sm:flex-row items-center sm:justify-between"
                : "flex-col items-center gap-4"
            } px-7 w-full mx-auto py-10 border border-dashed border-primary-cBlack00 justify-center bg-[#ffffff04] rounded-[12px]`}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              multiple
            />
            <button
              type="button"
              className="bg-none border-none cursor-pointer p-0"
              onClick={handleButtonClick}
            >
              <IoCloudUploadOutline className="text-primary-cIcons92 w-10 h-auto" />
            </button>
            <div>
              <p className="text-center w-full text-[13px] text-primary-cBlack00 font-[400]">
                Select a file or drag and drop here
              </p>
              <p className="text-center w-full text-[12px] text-[#899294] font-[400]">
                File size no more than 10MB
              </p>
            </div>

            <Button
              onClick={handleButtonClick}
              className="px-4 h-max border-primary-cFileD2 text-primary-cFileD2 hover:text-white hover:bg-primary-cFileD2 py-1 text-[12px] font-[400] w-max"
              variant="outline"
            >
              SELECT FILE
            </Button>
          </div>

          {/* Image Preview Section */}
          {userState.images.length > 0 && (
            <div className="flex flex-col sm:px-7 px-1  w-full border md:w-[90%]  mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
             
                <div className="flex flex-col gap-3 items-start">
                  {userState.images.map((image:any, index) => (
                    <div
                      key={index}
                      className="flex items-center  gap-y-2 justify-between w-full py-2 bg-[#ffffff08] rounded-lg border border-[#ffffff1f]"
                    >
                      <div className="flex justify-center items-center w-full gap-3">
                        <FaRegFileImage className="text-primary-cFileD2 h-auto w-[40px] text-[40px]" />
                        <div className="flex flex-col items-center gap-1 w-full">
                        <div className="flex justify-between w-full">
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex gap-2">
                              <p className="text-primary-cBlack00 text-[12px] font-[400]">
                                {image?.name}
                              </p>
                              <span className="text-[12px] font-[400]">.</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  className="bg-none text-primary-cFileD2 outline-none border-none text-[12px] font-[400] cursor-pointer"
                                  onClick={() => typeof window !== "undefined" && window.open(image.url, "_blank")}
                                >
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] font-[400] flex gap-1  text-[#899294]">
                        <span>  {image.size}</span ><span> MB</span>
                          </p>
                        </div>
                        <div className="w-full relative">
                        <div className="w-full bg-gray-200 absolute rounded-full min-h-[1px]" />
                        <div className="w-[50%] relative z-30 bg-primary-cFileD2 rounded-full min-h-[1px]" />
                        </div>
                       
                      </div>
                      </div>
                    </div>
                  
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button onClick={handleCancel} variant="solid">
                  Cancel
                </Button>
                <Button
                  onClick={uploadHandles}
                  variant="outline"
                  className="py-[2px] px-4 text-primary-cDark7D text-[10px] font-[500]"
                >
                  UPLOAD
                </Button>
              </div>
            </div>
          )}

     
          {upload && (
            <div className="flex flex-col px-7 w-[90%] mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
              <UploaSuccess />
            </div>
          )}

         
          {Loader && (
            <div className="flex flex-col px-7 w-[90%] mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
              <LoaderComp />
            </div>
          )}
 
          {uploaderror && (
            <div className="flex flex-col px-7 w-[90%] mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
              <UploadError />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

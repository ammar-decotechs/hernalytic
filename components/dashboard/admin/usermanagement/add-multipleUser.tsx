import React, { useState, useRef } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import LoaderComp from "../election-results/loader-comp";
import UploaSuccess from "../election-results/upload-success";
import UploadError from "../election-results/upload-error";
import { setOpen, setActiveModal } from "../../../../redux/slices/generalSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

export default function AddMultipleUser() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [upload, setUpload] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [csvContent, setCsvContent] = useState<string[][] | null>(null);

  const { activeModal } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const parseCSV = (text: string): string[][] => {
    const rows = text.trim().split("\n");
    return rows.map((row) => row.split(","));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "text/csv") {
      setUploadError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const parsedData = parseCSV(text);
      setCsvContent(parsedData);
      setUpload(false);
    };

    reader.onerror = () => {
      setUploadError(true);
    };

    reader.readAsText(file);
  };

  const uploadHandler = () => {
    setLoader(true);

    // Simulate a delay for the upload
    setTimeout(() => {
      setLoader(false);
      setUpload(true);
    }, 3000);
  };

  const handleCancel = () => {
    setCsvContent(null);
    setUpload(false);
    setUploadError(false);
  };

  return (
    <Modal>
      <div className="w-full px-3 py-2">
        <div className="w-full px-3 py-2 flex justify-between mb-5">
          <p className="text-[24px] font-[400] text-primary-cBlue73">User Information</p>
          <IoClose
            className="cursor-pointer"
            onClick={() => {
              dispatch(setOpen(false));
              dispatch(setActiveModal(null));
            }}
          />
        </div>

        <div className="w-full px-3 py-2 grid grid-cols-1 gap-x-4">
          <div className="container mx-auto md:p-4 p-1 w-full">
            <div className="md:w-[600px] w-full mx-auto my-5">
              <h2 className="text-[16px] font-[500] text-primary-cDark1D my-5">Upload Results</h2>

              <div className="flex flex-col items-center justify-center w-full">
                {/* Upload Section */}
                <div
                  className={`flex ${
                    csvContent ? "flex-col justify-center items-center" : "flex-col items-center gap-4"
                  } px-7 w-full mx-auto py-10 border border-dashed border-primary-cBlack00 justify-center bg-[#ffffff04] rounded-[12px]`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv"
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
                      CSV file size no more than 10MB
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

                {/* CSV Preview Section */}
                {csvContent && (
                  <div className="flex flex-col px-7 w-full border md:w-[90%] mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
                    <div className="flex flex-col gap-3 items-start">
                      <h3 className="text-[14px] font-[500] text-primary-cDark1D">CSV Content</h3>
                      {csvContent.map((row, index) => (
                        <div key={index} className="flex gap-2">
                          {row.map((cell, cellIndex) => (
                            <p key={cellIndex} className="text-primary-cBlack00 text-[12px] font-[400]">
                              {cell}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 mt-4">
                      <Button onClick={handleCancel} variant="solid">
                        Cancel
                      </Button>
                      <Button
                        onClick={uploadHandler}
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

                {loader && (
                  <div className="flex flex-col px-7 w-[90%] mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
                    <LoaderComp />
                  </div>
                )}

                {uploadError && (
                  <div className="flex flex-col px-7 w-[90%] mx-auto mt-4 border-dotted py-10 border border-[#ffffff1f] bg-[#ffffff04] rounded-[12px]">
                    <UploadError />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full px-3 py-2 flex justify-end gap-x-4">
            <Button className="py-2 px-5" variant="outline" onClick={() => dispatch(setOpen(false))}>
              Cancel
            </Button>
            <Button className="py-2 px-3">ADD USER</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

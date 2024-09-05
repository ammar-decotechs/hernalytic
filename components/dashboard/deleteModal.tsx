import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { Button } from '../ui/button';
import { privateAPI } from '@/config/config';
import { deleteUser } from '@/redux/services/admin/admin';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  id: number;
  onDeleteSuccess: () => void; 

}

const DeleteModal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, id,onDeleteSuccess }) => {
  const [showModal, setShowModal] = useState(modalOpen);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setShowModal(true);
    } else {
      const timeout = setTimeout(() => setShowModal(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [modalOpen]);

  const handleClose = () => {
    setModalOpen(false);
  };

  if (!showModal) return null;


  const deleteData = async () => {
    try {
      setLoad(true);
      const res = await deleteUser(id);
      handleClose();
      setLoad(false);
      onDeleteSuccess();

    } catch (error) {
      console.log("error", error);
      setLoad(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${modalOpen ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div
        className={`w-[65%] h-[30vh] flex flex-col shadow-md rounded-md p-5 bg-white transform transition-transform duration-700 ${modalOpen ? 'scale-100' : 'scale-90'
          }`}
      >
        <div className="flex justify-end text-[30px]">
          <IoIosClose cursor="pointer" onClick={handleClose} />
        </div>
        <div className="text-[21px] font-normal text-[#005073]">
          Are you sure you want to delete?
        </div>
        <div className="flex justify-end gap-2 mt-auto">
          <Button
            className="bg-transparent py-2 px-8 border border-[#005073] text-[#005073]"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            onClick={deleteData}
            className={`bg-[#005073] py-2 px-8 text-white ${load ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={load}
          >
            {load ? <span className="load" /> : 'Yes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

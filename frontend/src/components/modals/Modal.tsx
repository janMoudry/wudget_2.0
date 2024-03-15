import { crossIcon } from "@assets/icons";
import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modalNumber: number;

  content: React.ReactNode;
  footer?: React.ReactNode;

  classname?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  modalNumber = 1,
  classname,
  content,
  footer,
}) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const zIndex = 100 + modalNumber;

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center modal-show`}
        onClick={handleClose}
        style={{
          zIndex: zIndex,
        }}
      />
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-96 min-h-40 bg-white opacity-0 rounded-md flex flex-col justify-between items-center p-4 gap-10 shadow-2xl opacity-show ${classname}`}
        style={{
          zIndex: zIndex + 1,
        }}
      >
        <header className="flex justify-between items-center w-full h-14 rounded-t-md p-4 gap-2">
          <h1 className={`text-xl font-bold text-primary `}>{title}</h1>
          <img
            src={crossIcon}
            alt="close icon"
            className="w-6 h-6 cursor-pointer"
            onClick={handleClose}
          />
        </header>
        <main className={`${!footer && "mb-5"}`}>{content}</main>
        {footer && (
          <footer className="flex justify-between items-center w-full h-14 rounded-b-md p-4 gap-2 mb-5">
            {footer}
          </footer>
        )}
      </div>
    </>
  );
};

export default Modal;

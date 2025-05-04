import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "./Buttons/IconButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
  title: string;
};

const Modal = ({
  isOpen,
  onClose,
  onCancel,
  children,
  overlayClassName = "",
  modalClassName = "",
  title,
}: Props) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      onCancel?.();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop overlay */}
          <div className="absolute inset-0 bg-black opacity-60" />

          {/* modal container */}
          <motion.div
            className={`relative bg-[#ECDFCC] rounded-lg shadow-xl max-w-[94dvw] max-h-[90vh] overflow-y-auto ${modalClassName}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <div className="w-full flex justify-between border-b-2 border-[#D8C9B0] p-[16px]">
              {/* modal title */}
              <h4 className="font-indie text-[#393E46]">{title}</h4>

              {/* close button (optional) */}
              <IconButton
                onClick={onClose}
                className="absolute top-[16px] right-[16px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[20px] w-[20px] text-[#393E46]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>

            {/* modal content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

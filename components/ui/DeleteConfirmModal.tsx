"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { LoadingIcon } from "../../icons"; 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: React.ReactNode; 
  errorMessage?: string; 
}

const DeleteConfirmModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  errorMessage = "An error occurred while deleting. Please try again." 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(false);

    try {
      await onConfirm();
      onClose();
    } catch (e) {
      console.error("Deletion failed:", e);
      setError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setError(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md p-6">
      <div className="pt-4 pb-4 text-center">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {title}
        </h4>

        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
          {message}
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl border border-error-200 bg-error-50 text-error-700 dark:border-error-700 dark:bg-error-900/20 text-xs">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button size="sm" variant="outline" onClick={handleClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          size="sm"
          disabled={isDeleting}
          className={
            isDeleting
              ? "bg-red-700 opacity-75 cursor-not-allowed flex items-center justify-center text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }
          onClick={handleDelete}
        >
          {isDeleting ? (
            <>
              <LoadingIcon
                width={16}
                height={16}
                className="animate-spin -ml-1 mr-3 !text-white !opacity-100 dark:!invert-0"
              />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
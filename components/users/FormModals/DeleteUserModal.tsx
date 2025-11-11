"use client";

import React, { useState, useEffect } from "react";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import { useDeleteUser } from "@/hooks/useUsers";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user?: {
    id: number;
    username: string;
  } | null;
}
const DeleteUserModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, user }) => {
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    if (!user?.id) return;

    try {
      await deleteUser.mutateAsync(user.id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onClose();
      onSuccess();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title="Confirm User Deletion"
      message={
        <>
          Are you sure you want to delete <strong>"{user?.username}"</strong>? This action cannot be undone.
        </>
      }
      errorMessage="Error deleting user. This user might be in use or protected."
    />
  );
};

export default DeleteUserModal;
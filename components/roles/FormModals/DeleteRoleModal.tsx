"use client";

import React from "react";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal"; 
import { useDeleteRole } from "@/hooks/useRoles";
import { Role } from "@/types/Role";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  role: Role | null;
}

const DeleteRoleModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, role }) => {
  const deleteRole = useDeleteRole();

  const handleDeleteRole = async (): Promise<void> => {
    if (!role?.id) {
      return Promise.reject(new Error("Role ID is missing."));
    }

    try {
      await deleteRole.mutateAsync(role.id);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      onSuccess();
      
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDeleteRole} 
      title="Confirm Role Deletion"
      message={
        <>
          Are you sure you want to delete the role <strong>"{role?.name}"</strong>? This action cannot be undone.
        </>
      }
      errorMessage="Error deleting role. This role might be in use or protected."
    />
  );
};

export default DeleteRoleModal;
import axiosInstance from "@/lib/axios";
import { RolePermission } from "@/types/RolePermission";
import { ApiResponse } from "@/types/ApiResponse";

export const getRolePermissions = async (roleId: number): Promise<RolePermission[]> => {
  const response = await axiosInstance.get<ApiResponse<RolePermission[]>>(
    `/roles/${roleId}/permissions`
  );
  return response.data.data; 
};

export const updateRolePermissions = async (roleId: number, permissionIds: number[]): Promise<RolePermission[]> => {
  const response = await axiosInstance.patch<ApiResponse<RolePermission[]>>(
    `/roles/${roleId}/permissions`,
    { permissionIds }
  );
  return response.data.data; 
};
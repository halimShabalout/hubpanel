import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { getRolePermissions, updateRolePermissions } from "@/services/rolePermissionService";
import { useMemo } from "react"; 

// Fetches role permissions and maps them to an array of IDs (number[])
export const useRolePermissions = (roleId: number) => {
  const { data = [], isLoading, isError, refetch } = useQuery<number[], Error>({ 
    queryKey: ["rolePermissions", roleId],
    queryFn: async () => {
      const res = await getRolePermissions(roleId);
      // Transform the array of objects into an array of permission IDs
      return res.map(p => p.permissionId) ?? []; 
    },
    enabled: !!roleId,
    staleTime: 1000 * 60 * 5,
  });

  const permissionIds = useMemo(() => {
    return data; 
  }, [data]);

  return { permissionIds, isLoading, isError, refetch };
};

// Handles updating role permissions
export const useUpdateRolePermissions = (): UseMutationResult<
  any,
  Error,
  { roleId: number; permissionIds: number[] }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, permissionIds }) =>
      updateRolePermissions(roleId, permissionIds),
    onSuccess: (_, variables) => {
      // Invalidate queries to refetch the updated permissions and user roles
      queryClient.invalidateQueries({ queryKey: ["rolePermissions", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
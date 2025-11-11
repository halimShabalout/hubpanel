"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { usePermissions } from "@/hooks/usePermissions";
import RefreshButton from "@/components/ui/button/RefreshButton";
import SearchBar from "@/components/form/input/SearchBar";

const PermissionsComponent = () => {
  const { permissions = [], isLoading, refetch } = usePermissions();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPermissions = useMemo(() => {
    return permissions.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.endpoint.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [permissions, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-600 dark:text-gray-300">Loading permissions...</p>
      </div>
    );
  }

  const hasPermissions = permissions.length > 0;
  const hasResults = filteredPermissions.length > 0;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 lg:mb-7">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Permissions
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search + Total */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total: {filteredPermissions.length}
            </p>
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
            />
          </div>
          {/* Refresh */}
          <RefreshButton onRefresh={refetch} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-600 text-start text-theme-xs uppercase tracking-wider dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-600 text-start text-theme-xs uppercase tracking-wider dark:text-gray-400"
                  >
                    Endpoint
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-600 text-start text-theme-xs uppercase tracking-wider dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {hasResults ? (
                  filteredPermissions.map((permission) => (
                    <TableRow
                      key={permission.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg dark:text-gray-100">
                        {permission.name}
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg text-gray-600 dark:text-gray-300">
                        {permission.endpoint}
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg text-gray-500 dark:text-gray-400">
                        {new Date(permission.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <td
                      colSpan={3}
                      className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      {hasPermissions 
                        ? `No results found for "${searchTerm}".`
                        : "No permissions available."
                      }
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionsComponent;
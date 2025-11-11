export const PERMISSIONS = {
  // Languages
  VIEW_LANGUAGES: "/languages",
  ADD_LANGUAGE: "/language/create",
  EDIT_LANGUAGE: "/languages/update",
  DELETE_LANGUAGE: "/languages/delete",

  VIEW_LANGUAGE_KEYS: "view/language-keys",
  EDIT_LANGUAGE_KEYS: "edit/language-keys",

  // Users
  VIEW_USERS: "/users",
  ADD_USER: "/users/create",
  EDIT_USER: "/users/update",
  DELETE_USER: "/users/delete",

  // Roles & Permissions
  VIEW_ROLES: "/roles",
  ADD_ROLE: "/roles/create",
  EDIT_ROLE: "/roles/update",
  DELETE_ROLE: "/roles/delete",
  MANAGE_ROLE_PERMISSIONS: "/role/permissions",

  VIEW_PERMISSIONS: "view-permissions",
  ADD_PERMISSION: "add-permission",
  EDIT_PERMISSION: "edit-permission",
  DELETE_PERMISSION: "delete-permission",

  // Products
  VIEW_PRODUCTS: "/products",
  ADD_PRODUCT: "/product/create",
  EDIT_PRODUCT: "/product/update",
  DELETE_PRODUCT: "/product/delete",

  // Product Categories
  VIEW_CATEGORIES: "/categories",
  ADD_CATEGORY: "/category/create",
  EDIT_CATEGORY: "/category/update",
  DELETE_CATEGORY: "/category/delete",

  // Dashboard
  VIEW_DASHBOARD: "view-dashboard",

  // Profile
  VIEW_PROFILE: "view-profile",
  EDIT_PROFILE: "edit-profile",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = typeof PERMISSIONS[PermissionKey];

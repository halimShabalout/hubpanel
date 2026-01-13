"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDownIcon,
  UserCircleIcon,
  UserIcon,
  CategoriesIcon,
  ProductsIcon,
  DashboardIcon,
  LockIcon,
  EnvelopeIcon
} from "../icons";
import { useLocale } from "@/context/LocaleContext";
import { PERMISSIONS } from "@/types/Permissions";
import { useCurrentUser } from "@/hooks/useAuth";

type SubItem = Exclude<NavItem["subItems"], undefined>[number];

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const getNavItems = (
  messages: Record<string, string>,
  canViewDashboard: boolean,
  canViewCategories: boolean,
  canAddCategory: boolean,
  canViewProducts: boolean,
  canAddProduct: boolean,
  canViewContactRequests: boolean
): NavItem[] => {
  const navItems: NavItem[] = [];

  if (canViewDashboard) {
    navItems.push({
      icon: <DashboardIcon />,
      name: messages["dashboard"] || "Dashboard",
      path: "/",
    });
  }

  if (canViewCategories || canAddCategory) {
    const categorySubItems: SubItem[] = [
      canViewCategories && { name: messages["products_categories"] || "Products Categories", path: "/categories/list-categories" },
      canAddCategory && { name: messages["add_product_categories"] || "Add Categories", path: "/categories/add-category" },
    ].filter(Boolean) as SubItem[];

    if (categorySubItems.length > 0) {
      navItems.push({
        icon: <CategoriesIcon />,
        name: messages["products_categories"] || "Products Categories",
        subItems: categorySubItems,
      });
    }
  }

  if (canViewProducts || canAddProduct) {
    const productSubItems: SubItem[] = [
      canViewProducts && { name: messages["products_list"] || "List Product", path: "/products/list-products" },
      canAddProduct && { name: messages["add_product"] || "Add Product", path: "/products/add-product" },
    ].filter(Boolean) as SubItem[];

    if (productSubItems.length > 0) {
      navItems.push({
        icon: <ProductsIcon />,
        name: messages["products_list"] || "List Products",
        subItems: productSubItems,
      });
    }
  }

  if (canViewContactRequests) {
    navItems.push({
      icon: <EnvelopeIcon />,
      name: messages["contact_requests"] || "Contact Requests",
      path: "/contact-requests",
    });
  }

  return navItems;
};

const getOtherItems = (
  messages: Record<string, string>,
  canViewRoles: boolean,
  canViewPermissions: boolean,
  canViewUsers: boolean,
  canViewProfile: boolean,
  canViewHomeSlider: boolean,
  canViewAboutUs: boolean,
  canViewContactInfo: boolean,
  canViewSocialLinks: boolean
): NavItem[] => {
  const items: NavItem[] = [];

  if (canViewRoles || canViewPermissions) {
    const roleSubItems: SubItem[] = [
      canViewPermissions && { name: messages["permissions"] || "Permissions", path: "/permissions" },
      canViewRoles && { name: messages["roles"] || "Roles", path: "/roles" },
    ].filter(Boolean) as SubItem[];

    if (roleSubItems.length > 0) {
      items.push({
        icon: <LockIcon />,
        name: messages["roles_permissions"] || "Roles && Permissions",
        subItems: roleSubItems,
      });
    }
  }

  if (canViewUsers) {
    items.push({
      icon: <UserIcon />,
      name: messages["users"] || "Users",
      path: "/users",
    });
  }

  if (canViewProfile) {
    items.push({
      icon: <UserCircleIcon />,
      name: messages["profile"] || "User Profile",
      path: "/profile",
    });
  }

  const settingSubItems: SubItem[] = [
    canViewHomeSlider && { name: messages["home_slider"] || "Home Slider", path: "/setting/home-slider" },
    canViewAboutUs && { name: messages["about_us"] || "About Us", path: "/setting/about-us" },
    canViewContactInfo && { name: messages["contact_informations"] || "Contact Information", path: "/setting/contact-information" },
    canViewSocialLinks && { name: messages["social_links"] || "Social Links", path: "/setting/social-links" },
  ].filter(Boolean) as SubItem[];

  if (settingSubItems.length > 0) {
    items.push({
      icon: <EnvelopeIcon />,
      name: messages["setting"] || "Setting",
      subItems: settingSubItems,
    });
  }

  return items;
};

// --------------------------

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { locale, messages } = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const { data: user } = useCurrentUser();

  const hasPermission = useCallback(
    (perm: string) =>
      !!user?.permissions?.some(p => p.endpoint === perm),
    [user]
  );

  const canViewDashboard = hasPermission(PERMISSIONS.VIEW_DASHBOARD);
  const canViewCategories = hasPermission(PERMISSIONS.VIEW_CATEGORIES);
  const canAddCategory = hasPermission(PERMISSIONS.ADD_CATEGORY);
  const canViewProducts = hasPermission(PERMISSIONS.VIEW_PRODUCTS);
  const canAddProduct = hasPermission(PERMISSIONS.ADD_PRODUCT);
  const canViewContactRequests = hasPermission(PERMISSIONS.VIEW_CONTACT_REQUESTS);
  const canViewRoles = hasPermission(PERMISSIONS.VIEW_ROLES);
  const canViewPermissions = hasPermission(PERMISSIONS.VIEW_PERMISSIONS);
  const canViewUsers = hasPermission(PERMISSIONS.VIEW_USERS);
  const canViewProfile = hasPermission(PERMISSIONS.VIEW_PROFILE);
  const canViewHomeSlider = hasPermission(PERMISSIONS.VIEW_HOME_SLIDER);
  const canViewAboutUs = hasPermission(PERMISSIONS.VIEW_ABOUT_US);
  const canViewContactInfo = hasPermission(PERMISSIONS.VIEW_CONTACT_INFORMATION);
  const canViewSocialLinks = hasPermission(PERMISSIONS.VIEW_SOCIAL_LINKS);

  const navItems = useMemo(
    () => getNavItems(
      messages as Record<string, string>,
      canViewDashboard,
      canViewCategories,
      canAddCategory,
      canViewProducts,
      canAddProduct,
      canViewContactRequests
    ),
    [messages, canViewDashboard, canViewCategories, canAddCategory, canViewProducts, canAddProduct, canViewContactRequests]
  );

  const othersItems = useMemo(
    () => getOtherItems(
      messages as Record<string, string>,
      canViewRoles,
      canViewPermissions,
      canViewUsers,
      canViewProfile,
      canViewHomeSlider,
      canViewAboutUs,
      canViewContactInfo,
      canViewSocialLinks
    ),
    [messages, canViewRoles, canViewPermissions, canViewUsers, canViewProfile, canViewHomeSlider, canViewAboutUs, canViewContactInfo, canViewSocialLinks]
  );

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = useCallback(
    (index: number, menuType: "main" | "others") => {
      setOpenSubmenu((prev) =>
        prev && prev.type === menuType && prev.index === index ? null : { type: menuType, index }
      );
    },
    []
  );

  useEffect(() => {
    ["main", "others"].forEach((type) => {
      const items = type === "main" ? navItems : othersItems;
      items.forEach((nav, i) => {
        if (nav.subItems?.some((sub) => isActive(sub.path))) {
          setOpenSubmenu({ type: type as "main" | "others", index: i });
        }
      });
    });
  }, [pathname, navItems, othersItems, isActive]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const el = subMenuRefs.current[key];
      if (el) {
        setSubMenuHeight((prev) => ({ ...prev, [key]: el.scrollHeight }));
      }
    }
  }, [openSubmenu]);

  const renderMenuItems = useCallback(
    (items: NavItem[], type: "main" | "others") => (
      <ul className="flex flex-col gap-4">
        {items.map((nav, i) => (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(i, type)}
                className={`menu-item group ${openSubmenu?.type === type && openSubmenu?.index === i
                  ? "menu-item-active"
                  : "menu-item-inactive"
                  } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              >
                <span>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    width={18}
                    height={18}
                    className={`ml-auto transition-transform duration-200 ${openSubmenu?.type === type && openSubmenu?.index === i ? "rotate-180" : ""}`}
                  />
                )}
              </button>
            ) : (
              <Link
                href={nav.path || "#"}
                className={`menu-item group ${isActive(nav.path || "") ? "menu-item-active" : "menu-item-inactive"}`}
              >
                <span>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              </Link>
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${type}-${i}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === type && openSubmenu?.index === i
                      ? `${subMenuHeight[`${type}-${i}`] || 0}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.path}
                        className={`menu-dropdown-item ${isActive(sub.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                          }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    ),
    [openSubmenu, isExpanded, isHovered, isMobileOpen, handleSubmenuToggle, subMenuHeight, isActive]
  );

  return (
    <aside
      className={`fixed flex flex-col px-5 transition-[width] duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800
      ${dir === "ltr" ? "left-0" : "right-0"} bg-white dark:bg-gray-900 text-gray-900 z-50
      ${isExpanded || isMobileOpen ? "w-[280px]" : isHovered ? "w-[280px]" : "w-[90px]"}
      ${isMobileOpen ? "translate-x-0" : dir === "rtl" ? "translate-x-full" : "-translate-x-full"}
      lg:translate-x-0 top-16 lg:top-0 h-[calc(100vh-64px)] lg:h-screen`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
              <Image
                className="dark:hidden"
                src={locale === 'en' ? '/en-light-mode.png' : '/ar-light-mode.png'}
                alt="Logo"
                width={200}
                height={10}
              />
              <Image
                className="hidden dark:block"
                src={locale === 'en' ? '/en-dark-mode.png' : '/ar-dark-mode.png'}
                alt="Logo"
                width={200}
                height={10}
              />
            </div>
          ) : (
            <>
              <Image
                className="dark:hidden"
                src="/logo.png"
                alt="Logo"
                width={50}
                height={10}
              />
              <Image
                className="hidden dark:block"
                src="/logo.png"
                alt="Logo"
                width={50}
                height={10}
              />
            </>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6 space-y-8">
          <section>
            <h2 className="mb-4 text-xs uppercase leading-5 text-gray-400">
              {messages["menu"] || "Menu"}
            </h2>
            {renderMenuItems(navItems, "main")}
          </section>

          <section>
            <h2 className="mb-4 text-xs uppercase leading-5 text-gray-400">
              {messages["others"] || "Others"}
            </h2>
            {renderMenuItems(othersItems, "others")}
          </section>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
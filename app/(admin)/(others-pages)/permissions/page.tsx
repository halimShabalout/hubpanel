import PermissionsComponent from "@/components/permissions/PermissionsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permissions",
  description: "Permissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PermissionsPage() {
  return (
    <section className="space-y-6">
      <PermissionsComponent />
    </section>
  );
}

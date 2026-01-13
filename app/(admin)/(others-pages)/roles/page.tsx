import RolesComponent from "@/components/roles/RolesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles",
  description: "Roles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RolesPage() {
  return (
    <section className="space-y-6">
      <RolesComponent />
    </section>
  );
}

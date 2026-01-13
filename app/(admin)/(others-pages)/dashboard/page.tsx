import DashboardComponent from "@/components/dashboard/DashboardComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <DashboardComponent />
    </section>
  );
}

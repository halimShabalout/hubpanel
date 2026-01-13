import UsersComponent from "@/components/users/UsersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users List",
  description: "Users List.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UsersPage() {
  return (
    <section className="space-y-6">
      <UsersComponent />
    </section>
  );
}

import ProfileComponent from "@/components/user-profile/ProfileComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User Profile.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return (
    <section className="space-y-6">
      <ProfileComponent />
    </section>
  );
}

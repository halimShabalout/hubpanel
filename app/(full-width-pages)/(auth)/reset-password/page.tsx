import ResetPasswordComponent from "@/components/auth/ResetPasswordComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Admin | Elegant Torch",
  description: "Reset admin password for Elegant Torch dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordComponent />;
}

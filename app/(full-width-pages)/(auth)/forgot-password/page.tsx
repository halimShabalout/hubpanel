import ForgotPasswordComponent from "@/components/auth/ForgotPasswordComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Admin | Elegant Torch",
  description: "Forgot admin password for Elegant Torch dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return <ForgotPasswordComponent />;
}

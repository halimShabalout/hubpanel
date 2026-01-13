import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Elegant Torch",
  description: "Secure admin login for Elegant Torch dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignIn() {
  return <SignInForm />;
}

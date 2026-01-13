import SocialLinksComponent from "@/components/setting/social-links/SocialLinksComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Links",
  description: "Social Links.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SocialLinksPage() {
  return <SocialLinksComponent />;
}


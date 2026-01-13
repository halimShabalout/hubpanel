import { AboutUsComponent } from "@/components/setting/about-us/AboutUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AboutUs() {
  return (
    <>
      <AboutUsComponent />
    </>
  );
}

import ContactInformationComponent from "@/components/setting/contact-information/ContactInformationComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Informations",
  description: "Contact Informations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactInformation() {
  return (
    <>
      <ContactInformationComponent />
    </>
  );
}

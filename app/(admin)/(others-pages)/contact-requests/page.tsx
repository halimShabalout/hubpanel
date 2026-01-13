import { ContactRequestsComponent } from "@/components/contact-requests/ContactRequestsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Requests",
  description: "Contact Requests.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactRequests() {
  return (
    <section className="space-y-6">
        <ContactRequestsComponent />
    </section>
  );
}

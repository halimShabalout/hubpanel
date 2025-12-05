import SliderComponent from "@/components/setting/home-slider/SliderComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function ListPage() {
  return (
    <section className="space-y-6">
      <SliderComponent />
    </section>
  );
}

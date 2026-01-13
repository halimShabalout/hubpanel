import SliderComponent from "@/components/setting/home-slider/SliderComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Slider",
  description: "Home Slider.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ListPage() {
  return (
    <section className="space-y-6">
      <SliderComponent />
    </section>
  );
}

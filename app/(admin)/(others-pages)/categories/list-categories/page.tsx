import CategoriesComponent from "@/components/categories/list-categories/CategoriesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories List",
  description: "Categories List.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ListCategoriesPage() {
  return (
    <section className="space-y-6">
      <CategoriesComponent />
    </section>
  );
}

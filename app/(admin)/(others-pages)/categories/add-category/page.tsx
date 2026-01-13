import AddCategoryComponent from "@/components/categories/add-category/AddCategoryComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Category",
  description: "Add Category.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AddCategoryPage() {
  return (
    <section className="space-y-6">
      <AddCategoryComponent />
    </section>
  );
}

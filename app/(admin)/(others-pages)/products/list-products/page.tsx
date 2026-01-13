import ProductsComponent from "@/components/products/list-products/ProductsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products List",
  description: "Products List.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ListProductsPage() {
  return (
    <section className="space-y-6">
      <ProductsComponent />
    </section>
  );
}

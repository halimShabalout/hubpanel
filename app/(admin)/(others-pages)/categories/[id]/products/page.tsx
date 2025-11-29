"use client";
import { useParams, useSearchParams } from "next/navigation";
import ProductsComponent from "@/components/products/list-products/ProductsComponent";

export default function CategoryProductsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params?.id ? parseInt(params.id as string) : undefined;
  const categoryName = searchParams?.get("name") || "";

  return (
    <div className="space-y-6">
      <ProductsComponent 
        categoryId={categoryId}
        categoryName={categoryName}
      />
    </div>
  );
}

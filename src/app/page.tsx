import { HomeView } from "@/components/views/HomeView";
import { getActiveProducts, getAllCategories } from "@/lib/catalog";

export default async function HomePage() {
  const [categories, products] = await Promise.all([getAllCategories(), getActiveProducts()]);
  return <HomeView categories={categories.filter((c) => c.enabled)} products={products} />;
}

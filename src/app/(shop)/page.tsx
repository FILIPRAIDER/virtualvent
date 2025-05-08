export const dynamic = "force-dynamic";
import {
  CategorySlideShow,
  ProductSlideShow,
  StoreSlideShow,
} from "@/components";
import { BannerSlide } from "./ui/BannerSlide";
import { getProductos } from "@/actions";

export default async function Home() {
  const productos = await getProductos();

  return (
    <>
      <BannerSlide />
      <ProductSlideShow productos={productos} />
      <CategorySlideShow />
      <StoreSlideShow />
    </>
  );
}

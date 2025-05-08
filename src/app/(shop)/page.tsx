import {
  CategorySlideShow,
  ProductSlideShow,
  StoreSlideShow,
} from "@/components";
import { BannerSlide } from "./ui/BannerSlide";

export default async function Home() {
  return (
    <>
      <BannerSlide />
      <ProductSlideShow />
      <CategorySlideShow />
      <StoreSlideShow />
    </>
  );
}

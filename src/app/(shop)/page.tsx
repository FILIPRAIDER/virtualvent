import {
  CategorySlideShow,
  ProductSlideShow,
  StoreSlideShow,
} from "@/components";
import { BannerSlide } from "./ui/BannerSlide";
export default function Home() {
  return (
    <>
      <BannerSlide />
      <ProductSlideShow />
      <CategorySlideShow />
      <StoreSlideShow />
    </>
  );
}

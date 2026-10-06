import { siteImg } from "@/server/site-images";
import FactoryShowcaseClient from "./FactoryShowcaseClient";

export default function FactoryShowcase() {
  const images = {
    "0": siteImg("home/FactoryShowcase#1", "/images/factory/kho-6.jpg"),
    "1": siteImg("home/FactoryShowcase#2", "/images/factory/ma-treo-2.jpg"),
    "2": siteImg("home/FactoryShowcase#3", "/images/factory/phan-tich-1.jpg"),
    "3": siteImg("home/FactoryShowcase#4", "/images/factory/phan-tich-3.jpg"),
  };
  return <FactoryShowcaseClient images={images} />;
}

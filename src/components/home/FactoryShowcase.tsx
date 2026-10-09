import { siteImg } from "@/server/site-images";
import FactoryShowcaseClient from "./FactoryShowcaseClient";

export default function FactoryShowcase() {
  const images = {
    "0": siteImg("home/FactoryShowcase#1", "/images/factory/hd/showcase-kho.jpg"),
    "1": siteImg("home/FactoryShowcase#2", "/images/factory/hd/showcase-treo.jpg"),
    "2": siteImg("home/FactoryShowcase#3", "/images/factory/hd/showcase-lab.jpg"),
    "3": siteImg("home/FactoryShowcase#4", "/images/factory/hd/showcase-may.jpg"),
  };
  return <FactoryShowcaseClient images={images} />;
}

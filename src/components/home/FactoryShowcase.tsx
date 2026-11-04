import { siteImg } from "@/server/site-images";
import FactoryZones from "./FactoryZones";

export default function FactoryShowcase() {
  const images = {
    "0": siteImg("home/FactoryZones#1", "/images/hanin/slide04-day-chuyen-ma-tu-dong.webp"),
    "1": siteImg("home/FactoryZones#2", "/images/hanin/slide08-toan-canh-day-chuyen-ma-quay.webp"),
    "2": siteImg("home/FactoryZones#3", "/images/hanin/slide09-be-ma.webp"),
    "3": siteImg("home/FactoryZones#4", "/images/hanin/slide13-may-ma-chan-khong-pvd.webp"),
    "4": siteImg("home/FactoryZones#5", "/images/hanin/slide10-hoa-chat-va-thiet-bi-phan-tich.webp"),
    "5": siteImg("home/FactoryZones#6", "/images/hanin/slide16-cum-be-lang.webp"),
  };
  return <FactoryZones images={images} />;
}

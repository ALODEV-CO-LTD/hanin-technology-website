import { siteImg } from "@/server/site-images";
import FactoryZones from "./FactoryZones";

export default function FactoryShowcase() {
  const images = {
    "0": siteImg("home/FactoryZones#1", "/images/profile-lib/day-chuyen-ma-tu-dong-cau-truc-cam.jpg"),
    "1": siteImg("home/FactoryZones#2", "/images/profile-lib/may-rung-tay-dau-day-chuyen-ma-quay.jpg"),
    "2": siteImg("home/FactoryZones#3", "/images/profile-lib/nha-xuong-ma-hut-khi-be-ma.jpg"),
    "3": siteImg("home/FactoryZones#4", "/images/hanin/slide13-may-ma-chan-khong-pvd.webp"),
    "4": siteImg("home/FactoryZones#5", "/images/profile-lib/phong-phan-tich-toan-canh.jpg"),
    "5": siteImg("home/FactoryZones#6", "/images/profile-lib/be-nhua-xanh-xu-ly-nuoc-thai.jpg"),
  };
  return <FactoryZones images={images} />;
}

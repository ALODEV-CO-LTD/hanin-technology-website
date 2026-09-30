import { useTranslations } from "next-intl";
import { getProductDetailContent } from "@/lib/products-data";
import { siteImg } from "@/server/site-images";
import ProductGalleryClient from "./ProductGalleryClient";

export default function ProductGallery() {
  const tp = useTranslations("SanPham");
  const { gallery } = getProductDetailContent(tp);
  const images = [
    siteImg("san-pham/ProductDetail#2", "https://lh3.googleusercontent.com/aida-public/AB6AXuDQf1X78lIBHCSSK-QTIU-1rQfqODRdlc0CrQizfhoXmWAJXae06wqmjuyxlhMS4kAVsPfZvH0aI8iUcAd5mB-36FhKva4FwkKLU953EQQhX5RP8cZpV0Eoy_y_-rPc7U8WHUP96plDdRXYmOIBkEFSgMHM2uYCWNrFLVOynZ02dIw1hOa3hHb21KAsATPXaZAl_Mjwe7DrnQ-V4bYxABALU_CgrHWqzM-08zjzAAUORk69ofOWK82T9A"),
    siteImg("san-pham/ProductDetail#3", "https://lh3.googleusercontent.com/aida-public/AB6AXuAgYMLFKLnFOAHBnQqBQvuiw6MjXcHNyYLgQ1LFWOLmfH0RMggYnvMbk_23VMB5GHxAs8nsqXbfBCnwoNBPxPME9_ure9QxHrUgkYHrE5p3MLIMiAKuh5vdNRhFhKfevNs5g6xfgAQ3uf_t9Eteimb2rM50vcE2aDIivFvuvK5is2nHv4mTVtfRTe2EDpZOfTACexNLlUNRyS2WsZL3llnZwq8BDq7HlY3woRcix3T9E6N5CHNVr4K_Og"),
    siteImg("san-pham/ProductDetail#4", "https://lh3.googleusercontent.com/aida-public/AB6AXuAWkZDChzTqGFvmOkP3p-eeHYdymByt9FprAYAwO-3dglLaqfl6yGQmRmt4oqhgrSDX2GDhNKFCXDhRZP59U6t2NnfhzoKhoEQf-_QwAhze4zVwl-dkh1Ff6IU059pYuRRw7p2M8H-hRUh-s4Hdn8VIuY8p7Dmpg0z64xXPruZQOURdRitekeIhiir0RWjj6U9JgLllQ03NH3uKZyT9OEYMGI2V36Yla6ipxRNOQotl5Ch53SeljoafhQ"),
    siteImg("san-pham/ProductDetail#5", "https://lh3.googleusercontent.com/aida-public/AB6AXuDVuy2C0hnhH3BKQmfxLoHMs5DDjb8OMIDyWxvZzDXeQ2RpxgHTW-Gwr-8tuvpFkqp-18dXdkha-exxhFIsYfjj0ov06G3nWt0RTRqR5L3p4udIo6FwdTOg49auJCu0QXuIoeko5vM052YuS78OuAB78O7dKJO0UqzbAXTPrmZZDjUZBwP2qmPm2NNsOqBidnCtyqAXFwsD2qqMY2RMXzRqfnjRK7RVf6zEgq9hokxFeBpMcHCFGL-0Gw"),
  ];
  return <ProductGalleryClient gallery={gallery.map((item, i) => ({ ...item, image: images[i] }))} />;
}

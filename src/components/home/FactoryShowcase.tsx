import { siteImg } from "@/server/site-images";
import FactoryShowcaseClient from "./FactoryShowcaseClient";

export default function FactoryShowcase() {
  const images = {
    "0": siteImg("home/FactoryShowcase#1", "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg"),
    "1": siteImg("home/FactoryShowcase#2", "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"),
    "2": siteImg("home/FactoryShowcase#3", "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg"),
    "3": siteImg("home/FactoryShowcase#4", "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg"),
  };
  return <FactoryShowcaseClient images={images} />;
}

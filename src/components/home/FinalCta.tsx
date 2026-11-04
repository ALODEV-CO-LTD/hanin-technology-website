import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";

/** Trang chủ: khối "Yêu cầu báo giá" là một section duy nhất, không kèm thẻ thông tin liên hệ. */
export default function FinalCta() {
  return (
    <section className="w-full py-space-xl bg-white scroll-mt-[var(--header-h)]" id="bao-gia">
      <div className="mx-auto px-margin">
        <RfqFormCategory className="" />
      </div>
    </section>
  );
}

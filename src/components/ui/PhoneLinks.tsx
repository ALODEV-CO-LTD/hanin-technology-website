import { Fragment } from "react";
import { telHref, type Phone } from "@/server/settings";

/** Hiển thị danh sách số điện thoại (định dạng 0975080648) thành các liên kết gọi, cách nhau bằng dấu phân cách. */
export default function PhoneLinks({
  phones,
  separator = " / ",
  className = "hover:text-steel-600",
}: {
  phones: Pick<Phone, "number">[];
  separator?: string;
  className?: string;
}) {
  return (
    <>
      {phones.map((p, i) => (
        <Fragment key={p.number}>
          {i > 0 && separator}
          <a href={telHref(p.number)} className={className}>
            {p.number}
          </a>
        </Fragment>
      ))}
    </>
  );
}

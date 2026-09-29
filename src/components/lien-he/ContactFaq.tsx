"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "1. Thời gian HANIN phản hồi báo giá kỹ thuật chi tiết là bao lâu?",
    answer:
      "Với bản vẽ 2D (PDF, DWG) hoặc 3D (STEP) đầy đủ thông số vật liệu nền và độ dày lớp mạ, HANIN phản hồi báo giá trong vòng 04 giờ làm việc. Đơn hàng tổ hợp cần xử lý nhiệt đặc biệt hoặc tiêu chuẩn ASTM khắt khe: tối đa 24 giờ.",
  },
  {
    question: "2. HANIN hỗ trợ những định dạng bản vẽ kỹ thuật nào khi tiếp nhận qua website?",
    answer:
      "HANIN nhận trực tiếp các tệp .STEP, .STP, .DWG, .DXF, .IGES, .X_T, .PDF và file nén .ZIP/.RAR tới 50MB, tương thích SolidWorks, Inventor, AutoCAD, Creo. Bản vẽ dung lượng lớn hơn, gửi link cloud đến email engineering@hanintech.vn.",
  },
  {
    question: "3. Chính sách bảo mật bản vẽ (NDA) của HANIN được thực hiện như thế nào?",
    answer:
      "HANIN ký thỏa thuận bảo mật (Non-Disclosure Agreement - NDA) trước hoặc ngay khi tiếp nhận dữ liệu. Bản vẽ, mô hình 3D và thông số kỹ thuật được lưu trên máy chủ nội bộ cô lập, chỉ kỹ sư phụ trách trực tiếp có quyền truy cập và không chia sẻ cho bên thứ ba.",
  },
  {
    question: "4. Số lượng đơn hàng tối thiểu (MOQ) cho các chi tiết xi mạ là bao nhiêu?",
    answer:
      "MOQ linh hoạt: HANIN nhận gia công từ 01 chi tiết mẫu thử R&D, lô thử nghiệm 500 - 1.000 chi tiết, đến hợp đồng cung ứng hàng loạt hàng trăm nghìn chi tiết mỗi tháng với bể mạ dung tích lớn.",
  },
  {
    question:
      "5. HANIN có hỗ trợ gia công mẫu thử nghiệm (Sampling) trước khi ký hợp đồng không?",
    answer:
      "Có. Với đơn hàng số lượng lớn hoặc linh kiện có yêu cầu kỹ thuật đặc thù, HANIN mạ mẫu thử (Sampling), đo độ dày lớp mạ bằng máy huỳnh quang tia X (XRF), kiểm tra độ bám dính và thử phun sương muối (Salt Spray Test theo ASTM B117), kèm biên bản kiểm định gửi quý khách phê duyệt trước khi sản xuất hàng loạt.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="max-w-4xl mx-auto px-margin">
        <div className="text-center mb-space-xl">
          <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
            CÂU HỎI THƯỜNG GẶP VỀ TIẾP NHẬN BÁO GIÁ
          </h2>
          <p className="text-body-md text-slate-500 mt-2">
            Giải đáp rõ ràng về quy trình thẩm định kỹ thuật, bảo mật bản vẽ và năng lực giao mẫu.
          </p>
        </div>

        <div className="flex flex-col gap-space-sm">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden"
              >
                <button
                  className="w-full p-space-md text-left flex items-center justify-between gap-space-md text-title-md font-bold text-slate-900 hover:text-steel-600 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-space-md pb-space-md pt-1 text-slate-600 text-body-md leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "1. Thời gian HANIN phản hồi báo giá kỹ thuật chi tiết là bao lâu?",
    answer:
      "Đối với các bản vẽ tiêu chuẩn 2D (PDF, DWG) hoặc mô hình 3D (STEP) có đầy đủ thông số vật liệu nền và độ dày lớp mạ, đội ngũ kỹ sư bán hàng của HANIN cam kết phản hồi báo giá hoàn chỉnh trong vòng 04 giờ làm việc. Đối với các đơn hàng gia công tổ hợp yêu cầu xử lý nhiệt đặc biệt hoặc tiêu chuẩn ASTM khắt khe, thời gian phản hồi tối đa là 24 giờ.",
  },
  {
    question: "2. HANIN hỗ trợ những định dạng bản vẽ kỹ thuật nào khi tiếp nhận qua website?",
    answer:
      "Hệ thống máy chủ kỹ thuật của chúng tôi đồng bộ với các phần mềm CAD/CAM hàng đầu (SolidWorks, Inventor, AutoCAD, Creo). Chúng tôi tiếp nhận trực tiếp các tệp: .STEP, .STP, .DWG, .DXF, .IGES, .X_T, .PDF và các tệp nén .ZIP / .RAR lên tới 50MB. Nếu bản vẽ có dung lượng lớn hơn, quý khách vui lòng gửi link điện toán đám mây đến email engineering@hanintech.vn.",
  },
  {
    question: "3. Chính sách bảo mật bản vẽ (NDA) của HANIN được thực hiện như thế nào?",
    answer:
      "HANIN cam kết 100% tuân thủ thỏa thuận bảo mật thông tin (Non-Disclosure Agreement - NDA) với đối tác trước hoặc ngay khi tiếp nhận dữ liệu. Toàn bộ bản vẽ, mô hình 3D và thông số bí mật công nghệ đều được lưu trữ trên máy chủ nội bộ cô lập, chỉ mở quyền truy cập cho kỹ sư phụ trách trực tiếp và cam kết không tiết lộ cho bất kỳ bên thứ ba nào.",
  },
  {
    question: "4. Số lượng đơn hàng tối thiểu (MOQ) cho các chi tiết xi mạ là bao nhiêu?",
    answer:
      "Chúng tôi có chính sách MOQ vô cùng linh hoạt nhằm hỗ trợ tối đa chu kỳ phát triển sản phẩm của doanh nghiệp. HANIN sẵn sàng nhận gia công từ 01 chi tiết mẫu thử R&D cho đến các lô thử nghiệm 500 – 1.000 chi tiết và hợp đồng cung ứng hàng loạt lên đến hàng trăm nghìn chi tiết mỗi tháng với bể mạ dung tích lớn.",
  },
  {
    question:
      "5. HANIN có hỗ trợ gia công mẫu thử nghiệm (Sampling) trước khi ký hợp đồng không?",
    answer:
      "Có. Đối với các đơn hàng số lượng lớn hoặc linh kiện có yêu cầu kỹ thuật đặc thù, HANIN sẽ tiến hành mạ mẫu thử (Sampling), đo kiểm độ dày lớp mạ bằng máy huỳnh quang tia X (XRF), kiểm tra thử nghiệm độ bám dính và phun sương muối kiểm tra ăn mòn (Salt Spray Test theo ASTM B117) kèm biên bản kiểm định đầy đủ gửi quý khách phê duyệt trước khi đi vào sản xuất hàng loạt.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="max-w-4xl mx-auto px-margin">
        <div className="text-center mb-space-xl">
          <span className="text-label-technical uppercase tracking-widest text-steel-600 font-bold block mb-1">
            SECTION 05 // FAQ
          </span>
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

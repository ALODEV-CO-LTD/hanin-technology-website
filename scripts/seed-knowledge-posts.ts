/**
 * Thêm các bài "Kiến thức kỹ thuật" (vi/zh/ko) vào bảng posts. An toàn chạy lại: upsert theo slug, không đụng bài khác.
 *   npm run db:knowledge
 * Nội dung chỉ dựa trên dữ kiện trong Company Profile 11126 (docs/KE-HOACH-BAI-KIEN-THUC.md); số liệu công nghệ chung
 * (chiều dày, thời gian…) cố ý không nêu cho tới khi HANIN xác nhận.
 * Định dạng body: "## " tiêu đề, "- " danh sách, khối dòng bắt đầu bằng "|" là bảng.
 */
import { get, run, transaction } from "../src/server/db";

type L = { vi: string; zh: string; ko: string };
interface Article {
  slug: string;
  category: "cong-nghe" | "chat-luong";
  image: string;
  badge: string;
  title: L;
  excerpt: L;
  imageAlt: L;
  readTime: L;
  body: L;
}

const AUTHOR: L = { vi: "Bộ phận kỹ thuật HANIN", zh: "HANIN 技术部", ko: "HANIN 기술부" };
const DATE = "2026-11-03";
const lib = (n: string) => `/images/profile-lib/${n}.jpg`;

const ARTICLES: Article[] = [
  {
    slug: "ma-nhua-abs-la-gi",
    category: "cong-nghe",
    image: lib("chi-tiet-vien-den-oto-ma-crom"),
    badge: "ABS · Ni-Cr",
    title: {
      vi: "Mạ trên nhựa ABS và ABS/PC: nguyên lý và các hệ lớp mạ",
      zh: "ABS 与 ABS/PC 塑料电镀：原理与镀层体系",
      ko: "ABS 및 ABS/PC 플라스틱 도금: 원리와 도금층 구성",
    },
    excerpt: {
      vi: "Nhựa không dẫn điện nên phải biến bề mặt thành nền dẫn điện trước khi mạ. Bài này giải thích các bước chính và bốn hệ mạ HANIN thực hiện trên nền ABS.",
      zh: "塑料不导电，电镀前必须先使表面具备导电性。本文说明主要步骤，以及 HANIN 在 ABS 基材上实施的四种镀层体系。",
      ko: "플라스틱은 전기가 통하지 않으므로 도금 전에 표면을 도전성으로 만들어야 합니다. 주요 단계와 HANIN이 ABS 소재에 적용하는 네 가지 도금 체계를 설명합니다.",
    },
    imageAlt: {
      vi: "Chi tiết viền nhựa ô tô sau mạ niken-crom",
      zh: "镍铬电镀后的汽车塑料饰条",
      ko: "니켈-크롬 도금 후 자동차 플라스틱 몰딩",
    },
    readTime: { vi: "4 phút đọc", zh: "阅读约 4 分钟", ko: "읽는 시간 4분" },
    body: {
      vi: `## 1. Vì sao nhựa cần quy trình riêng
Nhựa ABS và ABS/PC không dẫn điện và bề mặt trơn, nên lớp kim loại không bám trực tiếp. Quy trình mạ nhựa vì vậy gồm hai phần: xử lý bề mặt để tạo nền dẫn điện và bám dính, sau đó mạ điện các lớp kim loại.

## 2. Các bước chính
- Tẩy dầu và làm sạch bề mặt chi tiết.
- Xâm thực để tạo độ nhám vi mô giúp lớp kim loại bám.
- Trung hòa, hoạt hóa bằng HCl và Paradi để tạo lớp mầm dẫn điện.
- Mạ các lớp kim loại, kết thúc bằng lớp niken-crom.
- Kiểm tra ngoại quan, độ dày lớp mạ và thử độ bền theo yêu cầu khách hàng.

## 3. Các hệ mạ HANIN thực hiện trên ABS và ABS/PC
| Hệ mạ | Đặc điểm bề mặt | Ghi chú |
| --- | --- | --- |
| Niken Crom 3+ | Sáng bóng | Hệ crom hóa trị ba |
| Niken Crom 6+ | Sáng bóng | Hệ crom hóa trị sáu |
| Niken Satin | Mờ mịn, ít phản quang | Dùng cho chi tiết cần bề mặt mờ |
| Niken Crom đen | Màu đen sâu | Dùng cho chi tiết trang trí tối màu |

Ngoài ra có thể tạo xước Hair Line trên lớp niken crom theo yêu cầu.

## 4. Lưu ý khi thiết kế chi tiết
- Bề mặt nhựa và chất lượng khuôn ảnh hưởng trực tiếp đến ngoại quan sau mạ.
- Góc nhọn, lỗ sâu và vùng lõm khó mạ đều, nên trao đổi với kỹ sư trước khi chốt bản vẽ.
- Cách treo chi tiết lên giá phải được tính từ đầu để tránh vết tiếp điểm ở mặt nhìn thấy.

## 5. Ứng dụng
Viền khung đèn, ốp mặt nạ xe, nút điều khiển, logo và chữ nổi trên ô tô, xe máy và thiết bị gia dụng.

Gửi bản vẽ hoặc mẫu chi tiết qua trang Liên hệ để kỹ sư HANIN đánh giá khả năng mạ.`,
      zh: `## 1. 为什么塑料需要专门的工艺
ABS 和 ABS/PC 不导电且表面光滑，金属层无法直接附着。因此塑料电镀分为两部分：先进行表面处理，形成导电且附着良好的基底，再电镀各金属层。

## 2. 主要步骤
- 除油并清洁工件表面。
- 粗化（蚀刻）形成微观粗糙度，使金属层附着。
- 中和，并用盐酸和钯活化形成导电晶种层。
- 电镀各金属层，最后为镍铬层。
- 外观检验、镀层厚度测量，并按客户要求进行耐久测试。

## 3. HANIN 在 ABS 及 ABS/PC 上实施的镀层体系
| 镀层体系 | 表面特征 | 说明 |
| --- | --- | --- |
| 镍铬 3+ | 光亮 | 三价铬体系 |
| 镍铬 6+ | 光亮 | 六价铬体系 |
| 缎面镍 | 细腻哑光，反光低 | 用于需要哑光表面的零件 |
| 黑镍铬 | 深黑色 | 用于深色装饰件 |

此外，可按要求在镍铬层上制作拉丝（Hair Line）纹理。

## 4. 零件设计注意事项
- 塑料表面与模具质量直接影响电镀后的外观。
- 尖角、深孔和凹陷区域不易镀均匀，定稿前请与工程师沟通。
- 挂具方式须从一开始就考虑，避免可见面出现接触痕。

## 5. 应用
汽车灯框饰条、车标面罩、控制按钮、徽标与立体字，以及摩托车和家电零件。

请通过联系页面发送图纸或样件，HANIN 工程师将评估可镀性。`,
      ko: `## 1. 플라스틱에 별도 공정이 필요한 이유
ABS와 ABS/PC는 전기가 통하지 않고 표면이 매끄러워 금속층이 직접 붙지 않습니다. 따라서 플라스틱 도금은 두 부분으로 이루어집니다. 먼저 표면을 처리해 도전성과 밀착성을 갖춘 바탕을 만들고, 그 위에 금속층을 전기도금합니다.

## 2. 주요 단계
- 탈지 및 부품 표면 세정.
- 에칭으로 미세한 거칠기를 만들어 금속층이 밀착되도록 함.
- 중화 후 HCl과 팔라듐으로 활성화하여 도전성 시드층 형성.
- 금속층 도금 후 마지막에 니켈-크롬층 형성.
- 외관 검사, 도금 두께 측정, 고객 요구에 따른 내구 시험.

## 3. HANIN이 ABS 및 ABS/PC에 적용하는 도금 체계
| 도금 체계 | 표면 특성 | 비고 |
| --- | --- | --- |
| 니켈 크롬 3+ | 광택 | 3가 크롬 체계 |
| 니켈 크롬 6+ | 광택 | 6가 크롬 체계 |
| 새틴 니켈 | 부드러운 무광, 낮은 반사 | 무광 표면이 필요한 부품 |
| 블랙 니켈 크롬 | 짙은 검정 | 어두운 색 장식 부품 |

또한 요청에 따라 니켈 크롬층 위에 헤어라인(Hair Line) 처리가 가능합니다.

## 4. 부품 설계 시 유의사항
- 플라스틱 표면과 금형 품질이 도금 후 외관에 직접 영향을 줍니다.
- 날카로운 모서리, 깊은 구멍, 오목한 부위는 균일하게 도금하기 어려우므로 도면 확정 전에 엔지니어와 상의하세요.
- 보이는 면에 접점 자국이 남지 않도록 지그 걸이 방식을 처음부터 고려해야 합니다.

## 5. 적용 분야
자동차 램프 프레임 몰딩, 차량 그릴 커버, 조작 버튼, 로고 및 입체 문자, 오토바이와 가전 부품.

문의 페이지로 도면이나 샘플을 보내시면 HANIN 엔지니어가 도금 가능 여부를 검토합니다.`,
    },
  },
  {
    slug: "tien-xu-ly-be-mat-truoc-khi-ma",
    category: "cong-nghe",
    image: lib("nha-xuong-ma-treo-be-ma"),
    badge: "Tiền xử lý",
    title: {
      vi: "Tiền xử lý bề mặt trước khi mạ: vì sao quyết định độ bám lớp mạ",
      zh: "电镀前表面预处理：为何决定镀层附着力",
      ko: "도금 전 표면 전처리: 도금 밀착성을 좌우하는 이유",
    },
    excerpt: {
      vi: "Phần lớn lỗi bong tróc và rỗ lớp mạ bắt nguồn từ bề mặt chưa sạch hoặc chưa được hoạt hóa đúng. Bài này mô tả chuỗi tiền xử lý tại nhà máy HANIN.",
      zh: "镀层起皮和麻点多数源于表面不洁或活化不当。本文介绍 HANIN 工厂的预处理流程。",
      ko: "도금 박리와 핀홀의 대부분은 표면이 깨끗하지 않거나 활성화가 부적절한 데서 시작됩니다. HANIN 공장의 전처리 공정을 설명합니다.",
    },
    imageAlt: {
      vi: "Khu bể tiền xử lý và mạ treo tại nhà máy HANIN",
      zh: "HANIN 工厂预处理与挂镀槽区",
      ko: "HANIN 공장의 전처리 및 걸이 도금 탱크 구역",
    },
    readTime: { vi: "4 phút đọc", zh: "阅读约 4 分钟", ko: "읽는 시간 4분" },
    body: {
      vi: `## 1. Vai trò của tiền xử lý
Lớp mạ chỉ bám tốt khi nền kim loại hoặc nhựa sạch dầu, sạch oxit và có trạng thái bề mặt đồng nhất. Mọi sai lệch ở khâu này sẽ lộ ra sau mạ dưới dạng bong, rỗ, đổi màu hoặc mạ không đều.

## 2. Chuỗi tiền xử lý tại HANIN
- Nhập hàng và lưu kho: phân loại theo vật liệu nền và yêu cầu mạ.
- Tẩy dầu siêu âm: loại dầu mỡ, vết gia công bám trong khe và lỗ nhỏ.
- Bể HCl: loại oxit, gỉ trên nền kim loại.
- Hoạt hóa bề mặt: đưa bề mặt về trạng thái sẵn sàng nhận lớp mạ.
- Rửa nước giữa các bước: tránh mang hóa chất sang bể kế tiếp.

## 3. Lỗi thường liên quan đến tiền xử lý
| Hiện tượng | Nguyên nhân thường gặp ở tiền xử lý |
| --- | --- |
| Bong, tróc lớp mạ | Còn dầu hoặc oxit; hoạt hóa chưa đủ |
| Rỗ, đốm | Bề mặt còn tạp chất hoặc rửa chưa sạch |
| Mạ không đều | Bề mặt không đồng nhất giữa các vùng |
| Đổi màu sau mạ | Hóa chất tiền xử lý còn sót trong khe |

## 4. Điều khách hàng có thể giúp
- Cho biết vật liệu nền và quy trình gia công trước đó (dầu cắt gọt, dầu dập, chất tách khuôn).
- Hạn chế để chi tiết bị chạm tay trần hoặc gỉ trước khi mạ.
- Bao gói chi tiết sao cho không trầy xước và không dính bẩn khi vận chuyển.

Các thông số bể (nồng độ, nhiệt độ, thời gian) được thiết lập theo từng loại chi tiết và không công bố chung trong bài này.`,
      zh: `## 1. 预处理的作用
只有当基材（金属或塑料）无油、无氧化物且表面状态均匀时，镀层才能良好附着。该环节的任何偏差，都会在电镀后表现为起皮、麻点、变色或镀层不均。

## 2. HANIN 的预处理流程
- 收货入库：按基材和电镀要求分类。
- 超声波除油：去除附着在缝隙和小孔中的油脂与加工残留。
- 盐酸槽：去除金属基材上的氧化物和锈蚀。
- 表面活化：使表面处于可接受镀层的状态。
- 各步骤间水洗：避免将药液带入下一槽。

## 3. 与预处理有关的常见缺陷
| 现象 | 预处理环节的常见原因 |
| --- | --- |
| 镀层起皮、脱落 | 残留油污或氧化物；活化不足 |
| 麻点、斑点 | 表面残留杂质或水洗不净 |
| 镀层不均 | 各区域表面状态不一致 |
| 电镀后变色 | 缝隙中残留预处理药液 |

## 4. 客户可以配合的事项
- 说明基材及前道加工情况（切削油、冲压油、脱模剂）。
- 避免电镀前徒手触摸或生锈。
- 包装时避免划伤，并防止运输中污染。

槽液参数（浓度、温度、时间）按零件类型设定，本文不作通用公布。`,
      ko: `## 1. 전처리의 역할
도금층은 소재(금속 또는 플라스틱)에 기름과 산화물이 없고 표면 상태가 균일할 때만 잘 밀착됩니다. 이 단계의 편차는 도금 후 박리, 핀홀, 변색, 불균일 도금으로 나타납니다.

## 2. HANIN의 전처리 공정
- 입고 및 보관: 소재와 도금 요구에 따라 분류.
- 초음파 탈지: 틈과 작은 구멍에 낀 유지와 가공 잔여물 제거.
- HCl 탱크: 금속 소재의 산화물과 녹 제거.
- 표면 활성화: 도금층을 받아들일 수 있는 상태로 조정.
- 단계 사이 수세: 다음 탱크로 약품이 넘어가지 않도록 함.

## 3. 전처리와 관련된 흔한 불량
| 현상 | 전처리 단계의 흔한 원인 |
| --- | --- |
| 도금 박리 | 기름 또는 산화물 잔류, 활성화 부족 |
| 핀홀, 반점 | 표면 불순물 잔류 또는 수세 불량 |
| 불균일 도금 | 영역별 표면 상태 차이 |
| 도금 후 변색 | 틈에 남은 전처리 약품 |

## 4. 고객이 도와주실 수 있는 사항
- 소재와 선행 가공 정보(절삭유, 프레스유, 이형제)를 알려 주세요.
- 도금 전 맨손 접촉이나 녹 발생을 피해 주세요.
- 운송 중 긁힘과 오염이 없도록 포장해 주세요.

탱크 조건(농도, 온도, 시간)은 부품 종류별로 설정하며 이 글에서는 일반 공개하지 않습니다.`,
    },
  },
  {
    slug: "niken-dien-phan-va-niken-hoa-hoc",
    category: "cong-nghe",
    image: lib("banh-rang-xich-niken-hoa"),
    badge: "Ni · Niken hóa",
    title: {
      vi: "Niken điện phân và niken hóa: khác nhau thế nào, chọn khi nào",
      zh: "电镀镍与化学镍：区别与选择",
      ko: "전기 니켈과 무전해 니켈: 차이와 선택 기준",
    },
    excerpt: {
      vi: "Hai loại mạ niken cho tính chất khác nhau. Bài này so sánh theo tiêu chí kỹ sư thường dùng khi chọn lớp mạ cho chi tiết kim loại.",
      zh: "两种镍镀层的性能不同。本文按工程师选型常用的指标进行比较。",
      ko: "두 가지 니켈 도금은 특성이 다릅니다. 엔지니어가 금속 부품의 도금을 고를 때 쓰는 기준으로 비교합니다.",
    },
    imageAlt: {
      vi: "Bánh răng và xích sau mạ niken hóa",
      zh: "化学镀镍后的齿轮与链条",
      ko: "무전해 니켈 도금 후 기어와 체인",
    },
    readTime: { vi: "4 phút đọc", zh: "阅读约 4 分钟", ko: "읽는 시간 4분" },
    body: {
      vi: `## 1. Hai cách tạo lớp niken
Niken điện phân dùng dòng điện để lắng đọng niken lên chi tiết. Niken hóa tạo lớp niken bằng phản ứng hóa học trong dung dịch, không dùng dòng điện ngoài. Cách tạo lớp khác nhau dẫn đến tính chất khác nhau.

## 2. So sánh
| Tiêu chí | Niken điện phân | Niken hóa |
| --- | --- | --- |
| Ngoại quan | Sáng bóng, thẩm mỹ | Bề mặt đồng đều |
| Độ cứng, chống mài mòn | Trung bình | Cao hơn, chống mài mòn tốt |
| Chịu nhiệt | Thông thường | Tốt |
| Độ đồng đều trên hình dạng phức tạp | Phụ thuộc phân bố dòng điện | Đồng đều hơn ở góc và lỗ |
| Ứng dụng điển hình | Tay nắm, bu lông, bản lề, chốt định vị | Bánh răng, chốt, trục, tấm chi tiết máy |

Bảng chỉ so sánh định tính. Các giá trị cụ thể như độ cứng hay chiều dày được thỏa thuận theo từng đơn hàng.

## 3. Cách chọn
- Cần vẻ ngoài sáng bóng và bền: niken điện phân, có thể phủ tiếp crom.
- Cần chống mài mòn, chịu nhiệt hoặc lớp mạ đều ở chi tiết phức tạp: niken hóa.
- Chi tiết có phần ren, khe hẹp: nêu rõ để kỹ sư tính dung sai lớp mạ.

## 4. Các dây chuyền tại HANIN
Niken điện phân, niken hóa, niken đen và phốt phát mangan đen được thực hiện trên dây chuyền mạ quay và mạ treo bán tự động, tùy kích thước và số lượng chi tiết.

Gửi bản vẽ kèm yêu cầu độ cứng, độ dày và tiêu chuẩn nghiệm thu để được tư vấn lớp mạ phù hợp.`,
      zh: `## 1. 两种镍层的形成方式
电镀镍利用电流使镍沉积在工件上；化学镍依靠溶液中的化学反应形成镍层，不需要外加电流。形成方式不同，性能也不同。

## 2. 比较
| 指标 | 电镀镍 | 化学镍 |
| --- | --- | --- |
| 外观 | 光亮，装饰性好 | 表面均匀 |
| 硬度与耐磨 | 中等 | 较高，耐磨性好 |
| 耐热 | 一般 | 良好 |
| 复杂形状上的均匀性 | 取决于电流分布 | 角部和孔内更均匀 |
| 典型应用 | 把手、螺栓、铰链、定位销 | 齿轮、销、轴、机械零件板 |

本表仅作定性比较。硬度、厚度等具体数值按订单协商确定。

## 3. 如何选择
- 需要光亮且耐用的外观：电镀镍，可再镀铬。
- 需要耐磨、耐热，或复杂零件上镀层均匀：化学镍。
- 零件带螺纹或窄缝：请说明，以便工程师考虑镀层公差。

## 4. HANIN 的生产线
电镀镍、化学镍、黑镍和黑色磷酸锰处理，根据零件尺寸和数量在滚镀线和半自动挂镀线上进行。

请提供图纸，并注明硬度、厚度和验收标准要求，以便推荐合适的镀层。`,
      ko: `## 1. 니켈층을 만드는 두 가지 방법
전기 니켈은 전류로 니켈을 부품에 석출시킵니다. 무전해 니켈은 용액 속 화학 반응으로 니켈층을 만들며 외부 전류를 쓰지 않습니다. 형성 방식이 다르므로 특성도 다릅니다.

## 2. 비교
| 기준 | 전기 니켈 | 무전해 니켈 |
| --- | --- | --- |
| 외관 | 광택, 장식성 우수 | 균일한 표면 |
| 경도, 내마모 | 보통 | 더 높음, 내마모성 우수 |
| 내열성 | 일반 | 우수 |
| 복잡한 형상에서의 균일성 | 전류 분포에 좌우됨 | 모서리와 구멍에서 더 균일 |
| 대표 용도 | 손잡이, 볼트, 경첩, 위치 결정 핀 | 기어, 핀, 축, 기계 부품 플레이트 |

이 표는 정성적 비교입니다. 경도나 두께 같은 구체적 수치는 주문별로 협의합니다.

## 3. 선택 방법
- 광택 있고 내구성 있는 외관이 필요하면 전기 니켈(이후 크롬 도금 가능).
- 내마모, 내열 또는 복잡한 부품의 균일한 도금이 필요하면 무전해 니켈.
- 나사부나 좁은 틈이 있는 부품은 도금 공차를 고려할 수 있도록 알려 주세요.

## 4. HANIN의 생산 라인
전기 니켈, 무전해 니켈, 블랙 니켈, 흑색 망간 인산염 처리는 부품 크기와 수량에 따라 배럴 도금 라인과 반자동 걸이 도금 라인에서 진행합니다.

경도, 두께, 검수 기준 요구 사항과 함께 도면을 보내 주시면 적합한 도금을 안내해 드립니다.`,
    },
  },
  {
    slug: "kiem-tra-lop-ma-phun-muoi-do-day",
    category: "chat-luong",
    image: lib("phong-phan-tich-toan-canh"),
    badge: "NSS · CASS",
    title: {
      vi: "Kiểm tra lớp mạ: đo độ dày, phun muối NSS và CASS, thử Hull cell",
      zh: "镀层检测：测厚、NSS 与 CASS 盐雾、赫尔槽试验",
      ko: "도금층 검사: 두께 측정, NSS·CASS 염수분무, 헐셀 시험",
    },
    excerpt: {
      vi: "Các phép đo và thử nghiệm HANIN dùng để kiểm soát bể mạ và đánh giá thành phẩm, kèm thiết bị thực tế tại nhà máy.",
      zh: "HANIN 用于槽液控制和成品评估的测量与试验，以及工厂实际设备。",
      ko: "HANIN이 도금조 관리와 완제품 평가에 사용하는 측정·시험과 공장의 실제 장비를 소개합니다.",
    },
    imageAlt: {
      vi: "Phòng phân tích và kiểm tra lớp mạ tại HANIN",
      zh: "HANIN 的分析与镀层检测室",
      ko: "HANIN의 분석 및 도금층 검사실",
    },
    readTime: { vi: "5 phút đọc", zh: "阅读约 5 分钟", ko: "읽는 시간 5분" },
    body: {
      vi: `## 1. Hai nhóm kiểm tra
Kiểm soát chất lượng mạ gồm kiểm soát dung dịch trong bể (trước và trong khi mạ) và kiểm tra thành phẩm (sau khi mạ).

## 2. Thiết bị tại nhà máy HANIN
| Phép kiểm tra | Thiết bị | Mục đích |
| --- | --- | --- |
| Phân tích dung dịch | Phòng phân tích và hóa chất phân tích | Giữ thành phần bể trong dải làm việc |
| Thử bể mạ | Máy thử Hull cell | Đánh giá lớp mạ ở các vùng mật độ dòng khác nhau |
| Độ dày lớp mạ | Máy đo APC-100 | Xác nhận độ dày theo yêu cầu |
| Chống ăn mòn | Phun muối trung tính NSS | Đánh giá khả năng chống ăn mòn |
| Chống ăn mòn (axit) | Phun muối axit CASS | Thử nhanh hơn cho lớp mạ trang trí nhiều lớp |

## 3. Phun muối NSS và CASS
NSS dùng sương muối trung tính, còn CASS dùng sương muối axit có thêm muối đồng nên điều kiện ăn mòn khắc nghiệt hơn. Thời gian thử và tiêu chí đạt được thỏa thuận với khách hàng theo từng sản phẩm.

## 4. Kiểm tra sau khi phun sơn
Với chi tiết sơn và in, nhà máy có bộ thiết bị thử độ tin cậy gồm 10 loại: mài mòn RCA, nước nóng, nhiệt độ và độ ẩm cao, đo UV, cọ cồn/tẩy, cọ bút chì, thả rơi, đo độ dày, đánh bóng và uốn.

## 5. Cách đọc kết quả
- Ghi rõ vị trí đo và số điểm đo khi yêu cầu báo cáo độ dày.
- Nêu rõ tiêu chí đạt khi yêu cầu thử phun muối (thời gian, mức gỉ cho phép).
- Mẫu thử cần trùng với chi tiết và quy trình mạ thực tế.

Gửi tiêu chí nghiệm thu cùng bản vẽ để HANIN xác nhận phương án kiểm tra.`,
      zh: `## 1. 两类检测
电镀质量控制包括槽液控制（电镀前及过程中）和成品检验（电镀后）。

## 2. HANIN 工厂设备
| 检测项目 | 设备 | 目的 |
| --- | --- | --- |
| 溶液分析 | 分析室及分析试剂 | 保持槽液成分在工作范围内 |
| 镀槽试验 | 赫尔槽试验机 | 评估不同电流密度区的镀层 |
| 镀层厚度 | APC-100 测厚仪 | 按要求确认厚度 |
| 耐腐蚀 | 中性盐雾 NSS | 评估耐腐蚀能力 |
| 耐腐蚀（酸性） | 醋酸盐雾 CASS | 对多层装饰镀层更快速的试验 |

## 3. NSS 与 CASS 盐雾
NSS 使用中性盐雾；CASS 使用加铜盐的酸性盐雾，腐蚀条件更严苛。试验时间与合格标准按产品与客户协商确定。

## 4. 喷涂后检测
对于喷涂和印刷零件，工厂配有 10 种可靠性测试设备：RCA 耐磨、热水、高温高湿、紫外测量、酒精/橡皮摩擦、铅笔摩擦、跌落、厚度测量、抛光和弯折。

## 5. 如何解读结果
- 要求厚度报告时，请注明测量位置和测点数量。
- 要求盐雾试验时，请注明合格标准（时间、允许的锈蚀程度）。
- 试样应与实际零件和电镀工艺一致。

请将验收标准连同图纸一并发送，HANIN 将确认检测方案。`,
      ko: `## 1. 두 가지 검사
도금 품질 관리는 도금조 용액 관리(도금 전·중)와 완제품 검사(도금 후)로 나뉩니다.

## 2. HANIN 공장의 장비
| 검사 항목 | 장비 | 목적 |
| --- | --- | --- |
| 용액 분석 | 분석실 및 분석 시약 | 도금조 성분을 작업 범위로 유지 |
| 도금조 시험 | 헐셀 시험기 | 전류 밀도 구간별 도금 상태 평가 |
| 도금 두께 | APC-100 두께 측정기 | 요구 두께 확인 |
| 내식성 | 중성 염수분무 NSS | 내식성 평가 |
| 내식성(산성) | 초산 염수분무 CASS | 다층 장식 도금에 더 빠른 시험 |

## 3. NSS와 CASS 염수분무
NSS는 중성 염수 분무를, CASS는 구리염을 더한 산성 염수 분무를 사용하여 부식 조건이 더 가혹합니다. 시험 시간과 합격 기준은 제품별로 고객과 협의합니다.

## 4. 도장 후 검사
도장 및 인쇄 부품에는 10종의 신뢰성 시험 장비가 있습니다. RCA 마모, 온수, 고온고습, UV 측정, 알코올/지우개 마찰, 연필 마찰, 낙하, 두께 측정, 연마, 굽힘 시험입니다.

## 5. 결과를 읽는 방법
- 두께 성적서를 요청할 때는 측정 위치와 측정 점 수를 명시하세요.
- 염수분무 시험을 요청할 때는 합격 기준(시간, 허용 녹 수준)을 명시하세요.
- 시편은 실제 부품과 도금 공정이 같아야 합니다.

검수 기준을 도면과 함께 보내 주시면 HANIN이 검사 방안을 확인해 드립니다.`,
    },
  },
];

const j = (v: unknown) => JSON.stringify(v);
let added = 0, updated = 0;
transaction(() => {
  for (const a of ARTICLES) {
    const exists = !!get("SELECT id FROM posts WHERE slug = ?", a.slug);
    if (exists) {
      run(
        "UPDATE posts SET category_key=?, tech_badge=?, image=?, image_alt=?, title=?, excerpt=?, body=?, author=?, read_time=?, status='published', updated_at=datetime('now') WHERE slug=?",
        a.category, a.badge, a.image, j(a.imageAlt), j(a.title), j(a.excerpt), j(a.body), j(AUTHOR), j(a.readTime), a.slug,
      );
      updated++;
    } else {
      run(
        "INSERT INTO posts (slug, category_key, tech_badge, image, image_alt, title, excerpt, body, author, author_role, metrics, read_time, published_at, featured, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,'published')",
        a.slug, a.category, a.badge, a.image, j(a.imageAlt), j(a.title), j(a.excerpt), j(a.body), j(AUTHOR), j({ vi: "", zh: "", ko: "" }), "[]", j(a.readTime), DATE,
      );
      added++;
    }
  }
});
console.log(`Bài kiến thức kỹ thuật: thêm ${added}, cập nhật ${updated}.`);

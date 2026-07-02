import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { StrapiSingleResponse, StrapiResponse, TinTuc } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, Home } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// =====================
// SIDEBAR DANH MỤC
// =====================
const danhMuc = [
  { label: "Thông báo", href: "/tin-tuc?danh-muc=thong-bao" },
  { label: "Tuyển sinh", href: "/tin-tuc?danh-muc=tuyen-sinh" },
  { label: "Lịch thi", href: "/tin-tuc?danh-muc=lich-thi" },
  { label: "Danh sách thi", href: "/tin-tuc?danh-muc=danh-sach-thi" },
  { label: "Điểm thi", href: "/tin-tuc?danh-muc=diem-thi" },
];

function Sidebar() {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
            Danh mục
          </h3>
        </div>
        <ul>
          {danhMuc.map((item, i) => (
            <li
              key={i}
              className="border-b border-gray-100 last:border-0 hover:bg-sky-500 hover:text-white"
            >
              <Link
                href={item.href}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors"
              >
                {item.label}
                <ChevronRight size={16} className="text-black" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// =====================
// BREADCRUMB
// =====================
function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-sky-600 transition-colors"
      >
        <Home size={13} /> Trang chủ
      </Link>
      <ChevronRight size={13} />
      <Link
        href="/tin-tuc"
        className="hover:text-sky-600 transition-colors uppercase tracking-wide"
      >
        Thông báo chung
      </Link>
      <ChevronRight size={13} />
      <span className="text-gray-400 uppercase tracking-wide line-clamp-1">
        {title}
      </span>
    </nav>
  );
}

// =====================
// PAGE
// =====================
interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const res = await fetchStrapi<StrapiResponse<TinTuc>>("tin-tucs", {
      filters: { slug: { $eq: params.slug } },
      fields: ["tieu_de", "tom_tat"],
    });
    const item = res.data[0];
    if (!item) return {};
    return {
      title: item.attributes.tieu_de,
      description: item.attributes.tom_tat,
    };
  } catch {
    return {};
  }
}

export default async function TinTucDetailPage({ params }: PageProps) {
  let dsBaiKhac: { id: number; attributes: TinTuc }[] = [];
  try {
    // Lấy bài viết khác
    const resKhac = await fetchStrapi<StrapiResponse<TinTuc>>("tin-tucs", {
      pagination: { pageSize: 4 },
      sort: ["publishedAt:desc"],
    });
    dsBaiKhac = resKhac.data;
  } catch (e) {
    console.log("Lỗi:", e);
  }

  // ---- FALLBACK DATA (khi chưa có Strapi) ----
  return (
    <>
      {/* Hero banner */}
      <div className="relative h-48 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 flex items-center">
        <div className="relative container-main grid content-center">
          <h1 className="text-white font-black text-3xl uppercase tracking-wide">
            Giới thiệu trung tâm
          </h1>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container-main py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ===== NỘI DUNG BÀI VIẾT ===== */}
          <article className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-primary-800 leading-snug mb-3">
              Giới thiệu trung tâm ngoại ngữ - tin học Đông Phương
            </h2>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 pb-4 border-b border-gray-200">
              <Calendar size={14} />
              <span>Ngày đăng: 30/06/2026</span>
            </div>
            {/* Nội dung HTML từ Strapi */}
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
              Trung tâm Ngoại ngữ - Tin học Đông Phương được thành lập theo
              Quyết định số 1422/QĐ-SGDĐT ngày 13/12/2018 của Sở Giáo dục và Đào
              tạo tỉnh Quảng Nam. Trung tâm tọa lạc tại số 03, đường Hùng Vương,
              thành phố Tam Kỳ, tỉnh Quảng Nam (số 03, đường Hùng Vương, phường
              Bàn Thạch, thành phố Đà Nẵng), đến ngày 12/10/2021, Trung tâm
              chính thức được cấp phép hoạt động giáo dục về dạy học Tiếng Anh
              và Tin học theo Quyết định số 2040/QĐ-SGDĐT là cơ sở giáo dục
              thường xuyên ngoài công lập, có tư cách pháp nhân và con dấu
              riêng, hoạt động dưới sự quản lý trực tiếp của Sở Giáo dục và Đào
              tạo Tp Đà Nẵng.
              <br />
              Chương trình đào tạo:<br></br>- Môn Tiếng Anh: dành cho nhiều lứa
              tuổi, từ cấp mẫu giáo (sử dụng giáo trình First Friends, My Little
              Island) đến người lớn theo khung năng lực ngoại ngữ 6 bậc dùng cho
              Việt Nam (Cambridge Key English Test, First Certificate in
              English, Oxford English Grammar, Lifelines...).<br></br>- Môn Tin
              học: dành cho học viên trên 18 tuổi, giảng dạy theo chuẩn "Kỹ năng
              công nghệ thông tin cơ bản" và tổ chức thi và cấp chứng chỉ ứng
              dụng CNTT Cơ bản quy định tại Thông tư số 03/2014/TT-BTTTT của Bộ
              Thông tin và Truyền thông.<br></br>
              Bên cạnh hoạt động đào tạo, Trung tâm cũng luôn chú trọng công tác
              quản lý chất lượng, hỗ trợ sinh viên và tư vấn học tập nhằm tạo
              điều kiện tối đa cho người học trong suốt quá trình tham gia khóa
              học. Trung tâm luôn xem sự thành công của học viên là thước đo
              quan trọng của hiệu quả đào tạo
            </div>

            {/* Nút quay lại */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/tin-tuc"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
              >
                ← Quay lại danh sách tin tức
              </Link>
            </div>
          </article>

          {/* ===== SIDEBAR ===== */}
          <div className="flex flex-col gap-6 w-full lg:w-72 shrink-0">
            <Sidebar />

            {/* Bài viết liên quan */}
            {dsBaiKhac.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
                    Bài viết khác
                  </h3>
                </div>
                <ul className="divide-y divide-gray-100 line-clamp-1">
                  {dsBaiKhac.map((item: any) => (
                    <li key={item.id} className="line-clamp-1">
                      <Link
                        href={`/tin-tuc/${item.documentId}`}
                        className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group"
                      >
                        {item?.hinh_anh?.data && (
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 ">
                            <Image
                              src={getStrapiMedia(
                                item?.hinh_anh.data.attributes.url,
                              )}
                              alt={item?.tieu_de}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-600 group-hover:text-sky-600 line-clamp-2 leading-snug transition-colors">
                          {item?.tieu_de}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

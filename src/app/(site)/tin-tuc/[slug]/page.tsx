import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { StrapiSingleResponse, StrapiResponse, TinTuc } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, Home } from "lucide-react";

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
export default async function TinTucDetailPage({ params }: PageProps) {
  let baiViet: TinTuc | null = null;
  let dsBaiKhac: { id: number; attributes: TinTuc }[] = [];
  try {
    // Lấy bài viết theo slug
    const res = await fetchStrapi<{ data: TinTuc }>(`tin-tucs/${params.slug}`, {
      populate: ["hinh_anh", "File"],
    });
    if (!res.data) notFound();
    baiViet = res.data;

    // Lấy bài viết khác
    const resKhac = await fetchStrapi<StrapiResponse<TinTuc>>("tin-tucs", {
      populate: ["hinh_anh"],
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
        {baiViet?.hinh_anh?.data && (
          <Image
            src={getStrapiMedia(baiViet.hinh_anh.data.attributes.url)}
            alt={baiViet.tieu_de}
            fill
            className="object-cover mix-blend-overlay opacity-60"
          />
        )}
        <div className="relative container-main pb-6">
          <h1 className="text-white font-black text-3xl uppercase tracking-wide">
            Thông Báo
          </h1>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container-main py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ===== NỘI DUNG BÀI VIẾT ===== */}
          <article className="flex-1 min-w-0">
            {baiViet?.tieu_de && <Breadcrumb title={baiViet?.tieu_de} />}

            {/* Tiêu đề */}
            <h2 className="text-2xl font-bold text-primary-800 leading-snug mb-3">
              {baiViet?.tieu_de}
            </h2>

            {/* Ngày đăng */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 pb-4 border-b border-gray-200">
              <Calendar size={14} />
              <span>
                Ngày đăng:{" "}
                {baiViet?.createdAt &&
                  new Date(baiViet.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </span>
            </div>

            {/* Ảnh thumbnail (nếu có) */}
            {baiViet?.hinh_anh?.data && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                <Image
                  src={getStrapiMedia(baiViet.hinh_anh.data.attributes.url)}
                  alt={baiViet.tieu_de}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Nội dung HTML từ Strapi */}
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
              {baiViet?.noi_dung && (
                <div
                  className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }}
                />
              )}
            </div>
            {baiViet.File?.[0]?.url && (
              <div className="my-4">
                <a
                  href={`https://dong-phuong-cms-production.up.railway.app${baiViet.File[0].url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  📄 Văn bản đính kèm: {baiViet.File[0].name}
                </a>
              </div>
            )}

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

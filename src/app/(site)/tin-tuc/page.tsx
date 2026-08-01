import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { StrapiResponse, TinTuc } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = { title: "Tin tức" };

// =====================
// SIDEBAR DANH MỤC
// =====================
const danhMucList = [
  { label: "Thông báo", value: "thong-bao" },
  { label: "Tuyển sinh", value: "tuyen-sinh" },
  { label: "Lịch thi", value: "lich-thi" },
  { label: "Danh sách thi", value: "danh-sach-thi" },
  { label: "Điểm thi", value: "ket-qua" },
];

function Sidebar({ activeDanhMuc }: { activeDanhMuc?: string }) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
            Danh mục
          </h3>
        </div>
        <ul>
          <li className="border-b border-gray-100">
            <Link
              href="/tin-tuc"
              className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                !activeDanhMuc
                  ? "bg-sky-500 text-white"
                  : "hover:bg-sky-500 hover:text-white"
              }`}
            >
              Tất cả
              <ChevronRight
                size={16}
                className={!activeDanhMuc ? "text-white" : "text-black"}
              />
            </Link>
          </li>
          {danhMucList.map((item, i) => {
            const isActive = activeDanhMuc === item.value;
            return (
              <li key={i} className="border-b border-gray-100 last:border-0">
                <Link
                  href={`/tin-tuc?danh-muc=${item.value}`}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sky-500 text-white"
                      : "hover:bg-sky-500 hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronRight
                    size={16}
                    className={isActive ? "text-white" : "text-black"}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

// =====================
// PAGE
// =====================
interface PageProps {
  searchParams: Promise<{ "danh-muc"?: string }>;
}

export default async function TinTucPage({ searchParams }: PageProps) {
  const { "danh-muc": danhMuc } = await searchParams;

  let tinTucList: StrapiResponse<TinTuc> | null = null;
  try {
    tinTucList = await fetchStrapi<StrapiResponse<TinTuc>>("tin-tucs", {
      populate: ["hinh_anh"],
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 9 },
      ...(danhMuc ? { filters: { danh_muc: { $eq: danhMuc } } } : {}),
    });
  } catch {
    /* Strapi chưa chạy */
  }

  return (
    <div className="py-16">
      <div className="container-main">
        <h1 className="section-title">Tin tức & Thông báo</h1>
        <p className="section-subtitle">
          Cập nhật thông tin mới nhất từ trung tâm
        </p>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <Sidebar activeDanhMuc={danhMuc} />

          <div className="flex-1">
            {tinTucList?.data.length === 0 || !tinTucList?.data ? (
              <p className="text-gray-500">
                Không có tin tức nào thuộc danh mục này.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tinTucList?.data.map((item: any) => (
                  <Link
                    href={`/tin-tuc/${item.documentId}`}
                    key={item.id}
                    className="card group"
                  >
                    <div className="h-48 bg-primary-100 relative overflow-hidden">
                      {item.hinh_anh?.url && (
                        <Image
                          src={getStrapiMedia(item.hinh_anh.url)}
                          alt={item.tieu_de}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">
                        {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                      </p>
                      <h3 className="font-bold text-primary-700 mb-2 line-clamp-2">
                        {item.tieu_de}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3">
                        {item.tom_tat}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

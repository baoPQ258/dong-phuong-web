import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { StrapiResponse, KhoaHoc } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock, DollarSign } from "lucide-react";

export const metadata = {
  title: "Khóa học",
  description: "Các khóa học Ngoại ngữ và Tin học tại Trung tâm Đông Phương",
};

export default async function KhoaHocPage() {
  let khoaHocList: StrapiResponse<KhoaHoc> | null = null;

  try {
    khoaHocList = await fetchStrapi<StrapiResponse<KhoaHoc>>("khoa-hocs", {
      populate: ["hinh_anh"],
      sort: ["noi_bat:desc", "createdAt:desc"],
    });
  } catch {
    // Strapi chưa chạy hoặc chưa có data
  }

  // Fallback data khi chưa có Strapi
  const fallbackData = [
    { id: 1, ten: "Tin học cơ bản (Chứng chỉ A)", hoc_phi: 800000, thoi_gian: "2 tháng", mo_ta: "Ôn tập và thi chứng chỉ Tin học A quốc gia.", hinh: null },
    { id: 2, ten: "Tin học nâng cao (Chứng chỉ B)", hoc_phi: 1000000, thoi_gian: "3 tháng", mo_ta: "Chứng chỉ Tin học B, phù hợp cán bộ, công chức.", hinh: null },
    { id: 3, ten: "Ứng dụng CNTT cơ bản", hoc_phi: 900000, thoi_gian: "2.5 tháng", mo_ta: "Chuẩn kỹ năng CNTT theo quy định mới của Bộ GD&ĐT.", hinh: null },
    { id: 4, ten: "Tiếng Anh giao tiếp", hoc_phi: 1200000, thoi_gian: "3 tháng", mo_ta: "Nâng cao kỹ năng giao tiếp tiếng Anh thực tế.", hinh: null },
  ];

  return (
    <div className="py-16">
      <div className="container-main">
        <h1 className="section-title">Khóa học</h1>
        <p className="section-subtitle">Đa dạng khóa học, phù hợp mọi nhu cầu</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {khoaHocList?.data
            ? khoaHocList.data.map((item) => (
                <div key={item.id} className="card">
                  <div className="h-48 bg-primary-100 relative">
                    {item.attributes.hinh_anh?.data && (
                      <Image
                        src={getStrapiMedia(item.attributes.hinh_anh.data.attributes.url)}
                        alt={item.attributes.ten}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-primary-700 text-lg mb-2">{item.attributes.ten}</h3>
                    <p className="text-gray-500 text-sm mb-4">{item.attributes.mo_ta}</p>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1"><Clock size={14} /> {item.attributes.thoi_gian}</span>
                      <span className="flex items-center gap-1 font-semibold text-primary-600">
                        <DollarSign size={14} />
                        {item.attributes.hoc_phi.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <Link href="/lien-he" className="btn-primary block text-center text-sm py-2">
                      Đăng ký học
                    </Link>
                  </div>
                </div>
              ))
            : fallbackData.map((item) => (
                <div key={item.id} className="card">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-teal-100 flex items-center justify-center">
                    <span className="text-5xl">📚</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-primary-700 text-lg mb-2">{item.ten}</h3>
                    <p className="text-gray-500 text-sm mb-4">{item.mo_ta}</p>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1"><Clock size={14} /> {item.thoi_gian}</span>
                      <span className="flex items-center gap-1 font-semibold text-primary-600">
                        {item.hoc_phi.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <Link href="/lien-he" className="btn-primary block text-center text-sm py-2">
                      Đăng ký học
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

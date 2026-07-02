import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { StrapiResponse, TinTuc } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Tin tức" };

export default async function TinTucPage() {
  let tinTucList: StrapiResponse<TinTuc> | null = null;
  try {
    tinTucList = await fetchStrapi<StrapiResponse<TinTuc>>("tin-tucs", {
      populate: ["hinh_anh"],
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 9 },
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
      </div>
    </div>
  );
}

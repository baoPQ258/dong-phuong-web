import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedCardProps {
  image: string;
  imageAlt?: string;
  title: string;
  description?: string;
  badge?: string;
  href?: string;
  className?: string;
}

export function FeaturedCard({
  image,
  imageAlt,
  title,
  description,
  badge,
  href = "#",
  className,
}: FeaturedCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden bg-[#1a2236]",
        "border border-white/10 hover:border-white/20",
        "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className,
      )}
    >
      {/* Ảnh */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-white font-bold text-xl leading-snug">{title}</h3>

        {description && (
          <p className="text-gray-400 text-sm leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Nút Xem chi tiết */}
        <div className="mt-2 flex items-center justify-between border border-white/20 rounded-xl px-4 py-3 group-hover:border-white/40 transition-colors">
          <span className="text-white font-medium text-sm">Xem chi tiết</span>
          <ArrowRight
            size={16}
            className="text-white group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}

// ===== Cách dùng =====
// import { FeaturedCard } from "@/components/ui/FeaturedCard";
//
// <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//   <FeaturedCard
//     image="/images/tinhoc.jpg"
//     title="Chứng chỉ Tin học A – Cơ hội mở ra tương lai"
//     description="Chứng chỉ được công nhận toàn quốc, là điều kiện bắt buộc trong nhiều hồ sơ tuyển dụng."
//     badge="Khóa học hot"
//     href="/khoa-hoc/tin-hoc-a"
//   />
//   <FeaturedCard
//     image="/images/tiengAnh.jpg"
//     title="Tiếng Anh B1 – Mở cửa thế giới"
//     description="Chương trình chuẩn quốc tế, giảng viên IELTS 7.5+, cam kết đầu ra sau 3 tháng."
//     badge="Mới khai giảng"
//     href="/khoa-hoc/tieng-anh-b1"
//   />
// </div>

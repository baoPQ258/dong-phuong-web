import Link from "next/link";
import { BookOpen, Award, Users, Clock } from "lucide-react";
import { FeaturedCard } from "@/components/ui/card";
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { StrapiResponse, TinTuc } from "@/types";
// --- Hero Section ---
async function HeroSection() {
  let dsBaiKhac: { id: number; attributes: TinTuc }[] = [];
  try {
    // Lấy bài viết khác
    const resKhac = await fetchStrapi<StrapiResponse<TinTuc>>("trang-chus", {});
    dsBaiKhac = resKhac.data;
  } catch (e) {
    console.log("Lỗi:", e);
  }
  return (
    <section
      className="relative min-h-[560px] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, #f0f8ff 0%, #daeeff 45%, #a8d4f5 100%)",
      }}
    >
      <div className="container-main w-full grid md:grid-cols-2 gap-10 items-center py-16">
        <div>
          <p className="text-primary-500 font-semibold mb-2 text-sm uppercase tracking-wider">
            Sở Giáo dục và Đào tạo TP. Đà Nẵng
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-primary-800 leading-tight mb-4">
            TRUNG TÂM <br />
            <span className="text-primary-500">NGOẠI NGỮ – TIN HỌC</span>
            <br />
            <span className="text-teal-500">ĐÔNG PHƯƠNG</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Nơi kết nối tri thức, nâng tầm kỹ năng. Đào tạo chất lượng cao, đáp
            ứng mọi nhu cầu học tập của bạn.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/khoa-hoc" className="btn-primary">
              Xem khóa học
            </Link>
            <Link href="/lien-he" className="btn-outline">
              Đăng ký ngay
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Users, value: "1000+", label: "Học viên" },
            { icon: BookOpen, value: "20+", label: "Khóa học" },
            { icon: Award, value: "98%", label: "Đậu chứng chỉ" },
            { icon: Clock, value: "10+", label: "Năm kinh nghiệm" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur rounded-xl p-5 text-center shadow-sm"
            >
              <stat.icon className="mx-auto mb-2 text-primary-500" size={28} />
              <p className="text-2xl font-black text-primary-700">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Features Section ---
async function FeaturesSection() {
  const features = [
    {
      icon: "🏆",
      title: "Chứng chỉ được công nhận",
      desc: "Chứng chỉ Tin học A, B quốc gia và Ứng dụng CNTT theo chuẩn Bộ GD&ĐT.",
    },
    {
      icon: "👨‍🏫",
      title: "Giảng viên chuyên môn",
      desc: "Đội ngũ giảng viên nhiều năm kinh nghiệm, tận tâm với học viên.",
    },
    {
      icon: "📅",
      title: "Thi hàng tháng",
      desc: "Tổ chức ôn tập và thi chứng chỉ Tin học, Ngoại ngữ định kỳ mỗi tháng.",
    },
    {
      icon: "📋",
      title: "Hỗ trợ đăng ký thi",
      desc: "Hỗ trợ học viên đăng ký thi, nhận chứng chỉ nhanh chóng, thuận tiện.",
    },
  ];
  let dsLichThi: TinTuc[] = [];

  try {
    const resLichThi = await fetchStrapi<StrapiResponse<TinTuc>>(
      "tin-tucs?filters[danh_muc][$eq]=lich-thi&populate=*",
      {},
    );
    // Map ra bỏ wrapper StrapiData
    dsLichThi = resLichThi.data.map((item: any) => item.attributes ?? item);
  } catch (e) {
    console.log("Lỗi:", e);
  }
  let dsKetQua: TinTuc[] = [];
  try {
    const resKetQua = await fetchStrapi<StrapiResponse<TinTuc>>(
      "tin-tucs?filters[danh_muc][$eq]=ket-qua&populate=*",
      {},
    );
    // Map ra bỏ wrapper StrapiData
    dsKetQua = resKetQua.data.map((item: any) => item.attributes ?? item);
  } catch (e) {
    console.log("Lỗi:", e);
  }
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-main">
        <h2 className="section-title">Tại sao chọn Đông Phương?</h2>
        <p className="section-subtitle">
          Chúng tôi cam kết chất lượng đào tạo hàng đầu
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-6 text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-primary-700 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="section-title pt-20">Thông Báo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        <FeaturedCard
          image="/images/photo-1517694712202-14dd9538aa97.jpg"
          imageAlt="logo1"
          title={
            dsLichThi?.[0]?.tieu_de ||
            "Chứng chỉ Tin học A – Cơ hội mở ra tương lai"
          }
          description={dsLichThi?.[0]?.tom_tat}
          badge="Lịch thi"
          href={`/tin-tuc/${dsLichThi?.[0]?.documentId}`}
        ></FeaturedCard>
        <FeaturedCard
          image="/images/photo-1517694712202-14dd9538aa97.jpg"
          imageAlt="logo1"
          title={
            dsKetQua?.at(-1)?.tieu_de ||
            "Chứng chỉ Tin học A – Cơ hội mở ra tương lai"
          }
          description={dsKetQua?.at(-1)?.tom_tat}
          badge="Kết quả thi"
          href={`/tin-tuc/${dsKetQua?.at(-1)?.documentId}`}
        ></FeaturedCard>
        <FeaturedCard
          image="/images/photo-1517694712202-14dd9538aa97.jpg"
          imageAlt="logo1"
          title="Chứng chỉ Tin học A – Cơ hội mở ra tương lai"
          description="Chứng chỉ được công nhận toàn quốc, là điều kiện bắt buộc trong nhiều hồ sơ tuyển dụng."
          badge="Khóa học hot"
          href="http://localhost:3000/tin-tuc/slug"
        ></FeaturedCard>
      </div>
    </section>
  );
}

// --- CTA Section ---
function CTASection() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="container-main text-center text-white">
        <h2 className="text-3xl font-bold mb-3 text-white ">
          Sẵn sàng bắt đầu học?
        </h2>
        <p className="text-primary-100 mb-8 text-lg">
          Đăng ký ngay hôm nay để được tư vấn miễn phí và ưu đãi học phí.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/lien-he"
            className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Đăng ký tư vấn
          </Link>
          <Link
            href="/khoa-hoc"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Xem khóa học
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Page ---
export default function TrangChu() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}

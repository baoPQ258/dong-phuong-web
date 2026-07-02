import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white mt-20">
      <div className="container-main py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cột 1: Thông tin trung tâm */}
        <div>
          <h3 className="text-teal-400 font-bold text-lg mb-4">ĐÔNG PHƯƠNG</h3>
          <p className="text-primary-200 text-sm leading-relaxed mb-4">
            Trung tâm Ngoại ngữ - Tin học Đông Phương, trực thuộc Sở Giáo dục
            và Đào tạo Thành phố Đà Nẵng.
          </p>
          <div className="flex gap-3">
            <a href="#" className="bg-primary-600 hover:bg-teal-500 w-9 h-9 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
              <span className="font-bold text-sm">f</span>
            </a>
            <a href="#" className="bg-primary-600 hover:bg-teal-500 w-9 h-9 rounded-full flex items-center justify-center transition-colors" aria-label="Zalo">
              <span className="font-bold text-xs">Z</span>
            </a>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm text-primary-200">
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/gioi-thieu", label: "Giới thiệu" },
              { href: "/khoa-hoc", label: "Khóa học" },
              { href: "/tin-tuc", label: "Tin tức" },
              { href: "/lien-he", label: "Liên hệ" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-teal-400 transition-colors">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm text-primary-200">
            <li className="flex gap-2">
              <MapPin size={16} className="text-teal-400 shrink-0 mt-0.5" />
              <span>03 Hùng Vương, Phường Bàn Thạch, Thành phố Đà Nẵng</span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="text-teal-400 shrink-0" />
              <a href="tel:0236xxxx" className="hover:text-teal-400 transition-colors">0236.xxx.xxxx</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="text-teal-400 shrink-0" />
              <a href="mailto:info@dongphuong.edu.vn" className="hover:text-teal-400 transition-colors">
                info@dongphuong.edu.vn
              </a>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="text-teal-400 shrink-0" />
              <span>Thứ 2 – Thứ 7: 7:30 – 17:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-700 py-4">
        <div className="container-main text-center text-primary-300 text-sm">
          © {new Date().getFullYear()} Trung Tâm Ngoại Ngữ - Tin Học Đông Phương. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LienHePage() {
  const [form, setForm] = useState({
    ho_ten: "",
    dien_thoai: "",
    email: "",
    noi_dung: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Gửi lên Strapi
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/lien-hes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      toast.success("Gửi thành công! Chúng tôi sẽ liên hệ lại sớm.");
      setForm({ ho_ten: "", dien_thoai: "", email: "", noi_dung: "" });
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-16">
      <div className="container-main">
        <h1 className="section-title">Liên hệ</h1>
        <p className="section-subtitle">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Thông tin liên hệ */}
          <div>
            <h2 className="text-xl font-bold text-primary-700 mb-6">
              Thông tin liên hệ
            </h2>
            <ul className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Địa chỉ",
                  value: "03 Hùng Vương, Phường Bàn Thạch, TP. Đà Nẵng",
                },
                { icon: Phone, label: "Điện thoại", value: "0349769975" },
                { icon: Mail, label: "Email", value: "cpd.ued.vn" },
                {
                  icon: Clock,  
                  label: "Giờ làm việc",
                  value: "Thứ 2 – Thứ 7: 7:30 – 17:00",
                },
              ].map((item) => (
                <li key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">
                      {item.label}
                    </p>
                    <p className="text-gray-500 text-sm">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form liên hệ */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-primary-700 mb-6">
              Gửi tin nhắn
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ tên *
                </label>
                <input
                  type="text"
                  required
                  value={form.ho_ten}
                  onChange={(e) => setForm({ ...form, ho_ten: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Điện thoại
                  </label>
                  <input
                    type="tel"
                    value={form.dien_thoai}
                    onChange={(e) =>
                      setForm({ ...form, dien_thoai: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="0901xxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="email@gmail.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.noi_dung}
                  onChange={(e) =>
                    setForm({ ...form, noi_dung: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                  placeholder="Tôi muốn đăng ký khóa học..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? "Đang gửi..." : "Gửi tin nhắn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

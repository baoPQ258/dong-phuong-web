import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: {
    default: "Trung Tâm Ngoại Ngữ - Tin Học Đông Phương",
    template: "%s | Đông Phương",
  },
  description:
    "Trung tâm đào tạo Ngoại ngữ và Tin học chất lượng cao tại Đà Nẵng. Tổ chức ôn tập, thi chứng chỉ Tin học, Ngoại ngữ hàng tháng.",
  keywords: [
    "tin học",
    "ngoại ngữ",
    "đào tạo",
    "Đà Nẵng",
    "Đông Phương",
    "chứng chỉ",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Trung Tâm Ngoại Ngữ - Tin Học Đông Phương",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

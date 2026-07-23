"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../../../public/images/FreeSample-Vectorizer-io-Gemini_Generated_Image_1e5lwb1e5lwb1e5l(1)-Photoroom.svg";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 ">
      {/* Top bar */}
      <div className="bg-primary-600 text-white text-sm py-1.5">
        <div className="container-main flex justify-between items-center">
          <span>Sở Giáo dục và Đào tạo Thành phố Đà Nẵng</span>
          <a
            href="tel:0236xxxx"
            className="flex items-center gap-1 hover:text-teal-400 transition-colors"
          >
            <Phone size={14} />
            <span>0349769975</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-main flex items-center justify-between h-24 my-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden relative">
            <Image src={logo} alt="Logo" fill className="object-cover" />
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-primary-700 text-sm leading-tight">
              TRUNG TÂM NGOẠI NGỮ - TIN HỌC
            </p>
            <p className="font-black text-primary-500 text-lg leading-tight">
              ĐÔNG PHƯƠNG
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <Link
          href="/lien-he"
          className="hidden md:block btn-primary text-sm py-2"
        >
          Đăng ký học
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t bg-white",
          isOpen ? "block" : "hidden",
        )}
      >
        <ul className="container-main py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/lien-he"
              className="btn-primary block text-center text-sm"
            >
              Đăng ký học
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

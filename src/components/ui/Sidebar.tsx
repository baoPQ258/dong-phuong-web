// components/Sidebar.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const danhMucList = [
  { label: "Thông báo", value: "thong-bao" },
  { label: "Tuyển sinh", value: "tuyen-sinh" },
  { label: "Lịch thi", value: "lich-thi" },
  { label: "Danh sách thi", value: "danh-sach-thi" },
  { label: "Điểm thi", value: "ket-qua" },
];

export default function Sidebar({ activeDanhMuc }: { activeDanhMuc?: string }) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
            Danh mục
          </h3>
        </div>
        <ul>
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

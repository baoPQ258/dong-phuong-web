# 🏫 Dong Phuong Web — Next.js + Strapi Boilerplate

Website Trung tâm Ngoại ngữ - Tin học Đông Phương

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS
- **CMS/Backend**: Strapi v4
- **Database**: PostgreSQL (Supabase)
- **Deploy**: Vercel (frontend) + Railway (Strapi)

---

## 📁 Cấu trúc thư mục

```
dong-phuong/
├── src/
│   ├── app/
│   │   ├── site/                  # Các trang public
│   │   │   ├── trang-chu/         # Trang chủ
│   │   │   ├── gioi-thieu/        # Giới thiệu
│   │   │   ├── khoa-hoc/          # Danh sách khóa học
│   │   │   ├── tin-tuc/           # Tin tức
│   │   │   └── lien-he/           # Liên hệ
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   └── Footer.tsx         # Footer
│   │   ├── ui/                    # Reusable UI components
│   │   └── sections/              # Page sections
│   ├── lib/
│   │   ├── strapi.ts              # Strapi API helper
│   │   └── utils.ts               # Utility functions
│   └── types/
│       └── index.ts               # TypeScript types
├── public/images/
├── .env.local                     # Environment variables
└── package.json
```

---

## 🚀 Cài đặt và chạy

### Bước 1: Cài dependencies

```bash
cd dong-phuong
npm install
```

### Bước 2: Cấu hình environment

Chỉnh sửa file `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_token_here
```

### Bước 3: Cài và chạy Strapi

```bash
# Tạo project Strapi mới (chạy ở thư mục khác)
npx create-strapi-app@latest dong-phuong-cms --quickstart

# Truy cập http://localhost:1337/admin để tạo tài khoản admin
```

### Bước 4: Tạo Collections trong Strapi

Vào **Content-Type Builder** tạo các collection:

| Collection | Fields |
|---|---|
| `khoa-hoc` | ten, mo_ta, hoc_phi, thoi_gian, hinh_anh, noi_bat, slug |
| `tin-tuc` | tieu_de, noi_dung, tom_tat, hinh_anh, slug |
| `lien-he` | ho_ten, dien_thoai, email, noi_dung |

### Bước 5: Lấy API Token

1. Strapi Admin → **Settings → API Tokens → Create**
2. Type: **Read-only** (hoặc Full Access cho dev)
3. Copy token vào `.env.local`

### Bước 6: Chạy frontend

```bash
npm run dev
# Mở http://localhost:3000
```

---

## 🌐 Deploy

### Frontend → Vercel

```bash
npm install -g vercel
vercel --prod
```

### Strapi → Railway

1. Push Strapi lên GitHub
2. Kết nối Railway với repo
3. Add biến môi trường trên Railway dashboard

---

## 📋 Trang đã có

- [x] Trang chủ (Hero + Features + CTA)
- [x] Khóa học (grid, lấy từ Strapi)
- [x] Tin tức (grid, lấy từ Strapi)
- [x] Liên hệ (form gửi lên Strapi)
- [x] Navbar responsive
- [x] Footer

## 📋 Todo

- [ ] Trang Giới thiệu
- [ ] Trang chi tiết bài viết `/tin-tuc/[slug]`
- [ ] Trang chi tiết khóa học `/khoa-hoc/[slug]`
- [ ] SEO tối ưu
- [ ] Google Map nhúng
- [ ] Responsive hoàn chỉnh

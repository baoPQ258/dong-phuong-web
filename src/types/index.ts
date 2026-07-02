// Strapi base response wrapper
export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T>;
  meta: object;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

// Image type
export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
    };
  } | null;
}

// ===== Collections =====

export interface KhoaHoc {
  ten: string;
  mo_ta: string;
  hoc_phi: number;
  thoi_gian: string;
  hinh_anh: StrapiImage;
  noi_bat: boolean;
  slug: string;
  createdAt: string;
}

export interface TinTuc {
  tieu_de: string;
  noi_dung: any[];
  tom_tat: string;
  hinh_anh: StrapiImage;
  slug: string;
  createdAt: string;
  publishedAt: string;
  documentId: string;
}

export interface ThongTinTrungTam {
  ten: string;
  dia_chi: string;
  dien_thoai: string;
  email: string;
  gio_lam_viec: string;
  gioi_thieu: string;
  logo: StrapiImage;
  facebook: string;
  zalo: string;
}

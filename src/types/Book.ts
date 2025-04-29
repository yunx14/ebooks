export interface BookVolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface BookSaleInfo {
  country?: string;
  saleability?: string;
  isEbook?: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  buyLink?: string;
}

export interface BookAccessInfo {
  webReaderLink?: string;
  accessViewStatus?: string;
  epub?: {
    isAvailable: boolean;
    acsTokenLink?: string;
  };
  pdf?: {
    isAvailable: boolean;
    acsTokenLink?: string;
  };
}

export interface Book {
  id: string;
  etag?: string;
  selfLink?: string;
  volumeInfo: BookVolumeInfo;
  saleInfo?: BookSaleInfo;
  accessInfo?: BookAccessInfo;
} 
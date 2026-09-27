export type ProductCategory = 
  | 'pokeballs' 
  | 'special-balls' 
  | 'collectibles' 
  | 'custom' 
  | 'limited-editions';

export type BallType = 
  | 'pokeball' 
  | 'greatball' 
  | 'ultraball' 
  | 'masterball' 
  | 'premierball' 
  | 'duskball' 
  | 'luxuryball' 
  | 'quickball'
  | 'custom';

export type StockStatus = 'in_stock' | 'made_to_order' | 'sold_out';

export interface ProductSupportOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ProductFinishOption {
  id: string;
  name: string;
  description: string;
}

export interface ProductSpecs {
  diameter: string;
  material: string;
  weight: string;
  printTime: string;
  magnets: string;
  finishType: string;
  layerHeight: string;
  tolerances: string;
}

export interface GalleryAngle {
  id: string;
  label: string;
  desc: string;
  viewMode: 'front' | 'macro' | 'open' | 'stand';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  categoryLabel: string;
  ballType: BallType;
  stockStatus: StockStatus;
  leadTimeDays: number;
  badge?: string;
  isNew?: boolean;
  isLimited?: boolean;
  dropNumber?: string; // e.g. "01 / 50"
  editionTotal?: number;
  stockRemaining?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  longDescription: string;
  features: string[];
  specs: ProductSpecs;
  galleryAngles: GalleryAngle[];
  availableSupports: ProductSupportOption[];
  availableFinishes: ProductFinishOption[];
  allowCustomEngraving: boolean;
  engravingPrice: number;
  engravingMaxChars?: number;
  customColors?: {
    topColor: string;
    bottomColor: string;
    ringColor: string;
    buttonColor: string;
  };
}

export interface CartCustomization {
  selectedSupport: ProductSupportOption;
  selectedFinish: ProductFinishOption;
  customEngravingText?: string;
  customPalette?: {
    topColor: string;
    bottomColor: string;
    ringColor: string;
    buttonColor: string;
    name?: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization: CartCustomization;
  itemTotalPrice: number;
}

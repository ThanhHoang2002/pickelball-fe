export type ProductCategory = 
  | 'paddles' 
  | 'paddle-sets' 
  | 'clothing' 
  | 'accessories' 
  | 'custom-paddles';

export type Skill = 'beginner' | 'intermediate' | 'advanced';

export type ProductColor = {
  name: string;
  value: string;
  imageUrl: string;
};

export type ProductSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  tags: string[];
  images: string[];
  colors?: ProductColor[];
  sizes?: ProductSize[];
  skill?: Skill;
  isOnSale: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}; 
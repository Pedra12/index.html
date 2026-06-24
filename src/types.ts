export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface AcaiSize {
  id: string;
  name: string;
  price: number;
}

export interface AcaiComplement {
  id: string;
  name: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  isAcai: boolean;
  quantity: number;
  addons: Addon[];
  acaiSize?: AcaiSize;
  acaiComplements?: AcaiComplement[];
  totalPrice: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

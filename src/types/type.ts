export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}
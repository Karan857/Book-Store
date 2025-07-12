export interface BookType {
  id: number;
  title: string;
  description: string;
  status: string;
  price: number;
  amount: number;
  category_id: number;
  created_at: Date;
}
export interface createBookType {
  title: string;
  description: string;
  status: string;
  price: number;
  amount: number;
  category_id: number;
  created_at: Date;
}

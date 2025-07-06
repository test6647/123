export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
}

export interface Company {
  name: string;
  founder: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

export interface AdminContextType {
  products: Product[];
  company: Company;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateCompany: (company: Partial<Company>) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}
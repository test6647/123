import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Company, AdminContextType } from '../types';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = "VetXPharma2024";

const defaultCompany: Company = {
  name: "VET_X PHARMA",
  founder: "Haresh L Kanetiya",
  description: "Premium Veterinary Pharmaceuticals - Quality medicines trusted by veterinary professionals across Gujarat and beyond.",
  location: "Paliyad Road, Near Charmaliya Dada Temple, Bhadravadi, Botad-Gujarat",
  phone: "+91 9876543210",
  email: "info@vetxpharma.com"
};

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "VetX Amoxicillin 500mg",
    description: "Broad-spectrum antibiotic for bacterial infections in livestock and pets",
    price: 120,
    category: "Antibiotics & Antimicrobials",
    image: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400",
    createdAt: new Date()
  },
  {
    id: "2",
    name: "VetX Calcium Plus",
    description: "Essential calcium supplement for improved bone health and milk production",
    price: 85,
    category: "Nutritional Supplements",
    image: "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=400",
    createdAt: new Date()
  },
  {
    id: "3",
    name: "VetX Wound Heal",
    description: "Advanced wound care formula for faster healing and infection prevention",
    price: 95,
    category: "Surgical & Wound Care",
    image: "https://images.pexels.com/photos/5863389/pexels-photo-5863389.jpeg?auto=compress&cs=tinysrgb&w=400",
    createdAt: new Date()
  },
  {
    id: "4",
    name: "VetX Dewormer Pro",
    description: "Effective broad-spectrum deworming solution for all livestock",
    price: 75,
    category: "Parasiticides",
    image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg?auto=compress&cs=tinysrgb&w=400",
    createdAt: new Date()
  },
  {
    id: "5",
    name: "VetX Vitamin Complex",
    description: "Complete vitamin and mineral supplement for optimal animal health",
    price: 110,
    category: "Nutritional Supplements",
    image: "https://images.pexels.com/photos/5938322/pexels-photo-5938322.jpeg?auto=compress&cs=tinysrgb&w=400",
    createdAt: new Date()
  },
  {
    id: "6",
    name: "VetX Antiseptic Solution",
    description: "Professional-grade antiseptic for wound cleaning and disinfection",
    price: 65,
    category: "Surgical & Wound Care",
    image: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=400",
    createdAt: new Date()
  }
];

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [company, setCompany] = useState<Company>(defaultCompany);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('vetx-admin-auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateCompany = (companyData: Partial<Company>) => {
    setCompany(prev => ({ ...prev, ...companyData }));
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('vetx-admin-auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vetx-admin-auth');
  };

  return (
    <AdminContext.Provider value={{
      products,
      company,
      addProduct,
      updateProduct,
      deleteProduct,
      updateCompany,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
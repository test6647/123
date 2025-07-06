import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader, Chip, Button } from '@heroui/react';
import { Eye, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="bg-white backdrop-blur-sm border border-gray-200 h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <CardHeader className="p-0 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <Chip 
              className="bg-accent text-white font-bold text-base md:text-lg px-3 md:px-4 py-1 md:py-2 font-sans"
              radius="full"
            >
              ₹{product.price}
            </Chip>
          </div>
          <div className="absolute top-4 left-4">
            <Chip 
              className="bg-white/90 text-primary-dark font-medium font-sans"
              size="sm"
              radius="full"
            >
              {product.category}
            </Chip>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary-dark/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              isIconOnly
              className="bg-accent text-white hover:bg-accent-light transition-colors duration-300"
              radius="full"
              size="lg"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button
              isIconOnly
              className="bg-white text-primary-dark hover:bg-gray-100 transition-colors duration-300"
              radius="full"
              size="lg"
            >
              <Package className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardBody className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-display font-bold text-primary-dark mb-4 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-base md:text-lg line-clamp-3 mb-6 font-sans">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-display font-bold text-accent">
              ₹{product.price}
            </div>
            <Button
              className="bg-accent text-white font-semibold hover:bg-accent-light transition-colors duration-300 font-sans"
              radius="full"
              endContent={<Package className="h-4 w-4" />}
            >
              View Details
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
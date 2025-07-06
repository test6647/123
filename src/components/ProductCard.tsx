import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader, Chip, Button } from '@heroui/react';
import { ShoppingCart, Eye } from 'lucide-react';
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
      <Card className="bg-primary-dark backdrop-blur-sm border-primary-dark/10 h-full group">
        <CardHeader className="p-0 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Chip 
              className="bg-primary-light text-primary-dark font-bold text-base md:text-lg px-3 md:px-4 py-1 md:py-2"
              radius="full"
            >
              ₹{product.price}
            </Chip>
          </div>
          <div className="absolute top-4 left-4">
            <Chip 
              className="bg-primary-light/90 text-primary-dark font-medium"
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
              className="bg-primary-light text-primary-dark"
              radius="full"
              size="lg"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button
              isIconOnly
              className="bg-primary-light text-primary-dark"
              radius="full"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardBody className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-primary-light mb-4 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-primary-light/70 leading-relaxed text-base md:text-lg line-clamp-3 mb-6">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-bold text-primary-light">
              ₹{product.price}
            </div>
            <Button
              className="bg-primary-light text-primary-dark font-semibold"
              radius="full"
              endContent={<ShoppingCart className="h-4 w-4" />}
            >
              Add to Cart
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
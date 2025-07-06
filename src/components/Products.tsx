import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Input, Button, Chip, Card, CardBody } from '@heroui/react';
import { Search, Filter, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  const { products } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-primary-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(42,43,46,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 md:mb-20"
        >
          <Chip 
            className="bg-primary-dark/10 text-primary-dark font-semibold mb-6"
            size="lg"
            radius="full"
            startContent={<Package className="h-4 w-4 text-primary-dark" />}
          >
            Our Products
          </Chip>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-dark mb-6 md:mb-8 tracking-tight">
            Premium
            <span className="block text-primary-dark/70">Pharmaceuticals</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-primary-dark/70 max-w-4xl mx-auto leading-relaxed">
            Comprehensive range of veterinary pharmaceuticals for optimal animal health
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <Card className="bg-primary-dark backdrop-blur-sm border-primary-dark/10">
            <CardBody className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center">
                {/* Search */}
                <div className="flex-1 w-full max-w-md">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<Search className="h-5 w-5 text-primary-light/50" />}
                    className="text-lg"
                    radius="full"
                    size="lg"
                    classNames={{
                      input: "text-primary-light",
                      inputWrapper: "bg-primary-light/10 border-primary-light/20"
                    }}
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {categories.map(category => (
                    <Button
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? "solid" : "bordered"}
                      className={`font-semibold text-sm md:text-base ${
                        selectedCategory === category
                          ? 'bg-primary-light text-primary-dark shadow-lg'
                          : 'border-primary-light/30 text-primary-light hover:bg-primary-light/10'
                      }`}
                      radius="full"
                      size="md"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Products Display */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Mobile 3D Carousel */}
            <div className="md:hidden relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-primary-dark/70 text-sm">Swipe to see more products →</p>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    variant="bordered"
                    className="border-primary-dark/30 text-primary-dark"
                    radius="full"
                    size="sm"
                    onPress={scrollLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="bordered"
                    className="border-primary-dark/30 text-primary-dark"
                    radius="full"
                    size="sm"
                    onPress={scrollRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="flex-shrink-0 w-80 snap-center">
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 md:py-20"
          >
            <Card className="bg-primary-dark backdrop-blur-sm border-primary-dark/10 max-w-md mx-auto">
              <CardBody className="p-8 md:p-12">
                <Package className="h-12 md:h-16 w-12 md:w-16 text-primary-light/50 mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-primary-light mb-4">No Products Found</h3>
                <p className="text-primary-light/70 text-base md:text-lg">
                  No products found matching your criteria. Try adjusting your search or filters.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Products;
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Veterinary Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.02, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-primary-light mb-6 tracking-tighter leading-none">
                VET_X PHARMA
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-xl md:text-3xl lg:text-4xl text-primary-light/90 mb-6 font-light">
                Premium Veterinary Pharmaceuticals
              </p>
              <p className="text-base md:text-lg lg:text-xl text-primary-light/70 max-w-3xl mx-auto leading-relaxed">
                Trusted by veterinary professionals across Gujarat and beyond
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
            >
              <Button 
                onPress={scrollToProducts}
                className="bg-primary-light text-primary-dark font-bold text-base md:text-lg px-8 md:px-12 py-4 md:py-6 shadow-2xl"
                radius="full"
                size="lg"
              >
                Explore Products
              </Button>
              <Button 
                variant="bordered"
                onPress={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-primary-light/50 text-primary-light font-semibold text-base md:text-lg px-8 md:px-12 py-4 md:py-6"
                radius="full"
                size="lg"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="cursor-pointer"
              onClick={scrollToProducts}
            >
              <Button
                isIconOnly
                variant="light"
                className="text-primary-light/70 hover:text-primary-light"
                radius="full"
              >
                <ChevronDown size={28} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
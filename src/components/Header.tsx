import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@heroui/react';
import { Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Services', id: 'services' }
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50"
    >
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        className={`transition-all duration-500 ${
          scrolled 
            ? 'bg-primary-dark/95 backdrop-blur-lg shadow-2xl' 
            : 'bg-primary-dark/80 backdrop-blur-sm'
        }`}
        maxWidth="full"
        height="80px"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-primary-light"
          />
          <NavbarBrand>
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: scrolled ? 360 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <Stethoscope className="h-8 md:h-10 w-8 md:w-10 text-accent" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-display font-bold text-primary-light tracking-tight">VET_X PHARMA</h1>
                <p className="text-xs text-primary-light/70 -mt-1 hidden md:block font-sans">Premium Veterinary Pharmaceuticals</p>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 md:gap-8" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <Button
                  variant="light"
                  onPress={() => scrollToSection(item.id)}
                  className="text-primary-light hover:text-accent font-medium text-sm md:text-base font-sans transition-colors duration-300"
                  radius="full"
                >
                  {item.label}
                </Button>
              </motion.div>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarMenu className="bg-primary-dark/95 backdrop-blur-lg pt-8">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Button
                        variant="light"
                        onPress={() => scrollToSection(item.id)}
                        className="w-full text-primary-light hover:text-accent font-medium text-lg justify-start font-sans transition-colors duration-300"
                        radius="full"
                        size="lg"
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  </NavbarMenuItem>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
};

export default Header;
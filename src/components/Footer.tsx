import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Divider } from '@heroui/react';
import { Stethoscope } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { company } = useAdmin();

  const quickLinks = ['Home', 'About', 'Products', 'Services', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
              <Stethoscope className="h-8 w-8 text-primary-light" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-light">VET_X PHARMA</h3>
                <p className="text-xs text-primary-light/70 -mt-1">Premium Veterinary Pharmaceuticals</p>
              </div>
            </div>
            <p className="text-primary-light/70 leading-relaxed text-sm md:text-base">
              Quality medicines for optimal animal health.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg md:text-xl font-bold text-primary-light mb-6">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((item) => (
                <Button
                  key={item}
                  variant="light"
                  onPress={() => scrollToSection(item)}
                  className="text-primary-light/70 hover:text-primary-light font-normal text-sm"
                  radius="full"
                  size="sm"
                >
                  {item}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Company Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg md:text-xl font-bold text-primary-light mb-6">Founded By</h4>
            <p className="text-primary-light font-semibold text-base md:text-lg mb-2">{company.founder}</p>
            <p className="text-primary-light/70 text-sm">Serving Gujarat and Beyond</p>
          </motion.div>
        </div>

        <Divider className="my-8 bg-primary-light/20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary-light/70 text-xs md:text-sm">
            © {new Date().getFullYear()} VET_X PHARMA. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
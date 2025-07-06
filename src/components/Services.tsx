import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardBody, Chip } from '@heroui/react';
import { Shield, Truck, HeartHandshake, Phone, Clock, Award, Stethoscope } from 'lucide-react';

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control for all pharmaceutical products ensuring safety and efficacy"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Reliable Distribution",
      description: "Efficient supply chain ensuring timely delivery across Gujarat with temperature-controlled logistics"
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Professional Support",
      description: "Expert guidance and technical support for veterinary professionals and animal care specialists"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "24/7 Customer Service",
      description: "Round-the-clock support for urgent veterinary needs and emergency pharmaceutical requirements"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Processing",
      description: "Quick order processing and fulfillment for critical situations and time-sensitive treatments"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certified Products",
      description: "All products meet international standards and certifications for veterinary pharmaceutical excellence"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-primary-dark via-primary-dark to-primary-dark/90 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.05, 1, 1.05],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-primary-light/3 rounded-full blur-3xl"
        />
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
            className="bg-primary-light/10 text-primary-light font-semibold mb-6"
            size="lg"
            radius="full"
            startContent={<Stethoscope className="h-4 w-4" />}
          >
            Our Services
          </Chip>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-light mb-6 md:mb-8 tracking-tight">
            Comprehensive
            <span className="block text-primary-light/70">Veterinary Solutions</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-primary-light/70 max-w-4xl mx-auto leading-relaxed">
            Professional veterinary pharmaceutical services to support animal health specialists
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="h-full"
            >
              <Card className="bg-primary-light backdrop-blur-sm border-primary-light/10 h-full">
                <CardBody className="p-6 md:p-8">
                  <div className="text-primary-dark mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-dark mb-4">
                    {service.title}
                  </h3>
                  <p className="text-primary-dark/70 leading-relaxed text-base md:text-lg">
                    {service.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 md:mt-20"
        >
          <Card className="bg-primary-light backdrop-blur-sm border-primary-light/10 max-w-2xl mx-auto">
            <CardBody className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                Need Professional Support?
              </h3>
              <p className="text-primary-dark/70 text-base md:text-lg mb-6">
                Our expert team is ready to assist you with all your veterinary pharmaceutical needs.
              </p>
              <motion.button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-dark text-primary-light px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl"
              >
                Learn More About Us
              </motion.button>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
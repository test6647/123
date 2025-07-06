import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardBody, Chip } from '@heroui/react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Contact: React.FC = () => {
  const { company } = useAdmin();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      content: company.location,
      color: "bg-primary-dark"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: company.phone,
      color: "bg-primary-dark"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: company.email,
      color: "bg-primary-dark"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
      color: "bg-primary-dark"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-primary-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(42,43,46,0.1),transparent_50%)]"></div>
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
            startContent={<MessageCircle className="h-4 w-4" />}
          >
            Contact Us
          </Chip>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-dark mb-6 md:mb-8 tracking-tight">
            Get in
            <span className="block text-primary-dark/70">Touch</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-primary-dark/70 max-w-4xl mx-auto leading-relaxed">
            Connect with our team for inquiries about veterinary pharmaceutical products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            >
              <Card className="bg-primary-dark backdrop-blur-sm border-primary-dark/10 h-full text-center">
                <CardBody className="p-6 md:p-8">
                  <div className={`${info.color} p-4 rounded-full text-primary-light mx-auto mb-6 w-fit`}>
                    {info.icon}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-primary-light mb-4">
                    {info.title}
                  </h4>
                  <p className="text-primary-light/70 text-base md:text-lg leading-relaxed">
                    {info.content}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
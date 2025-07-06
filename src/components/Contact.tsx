import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
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
      title: "Our Location",
      content: company.location,
      color: "bg-accent",
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(company.location)}`, '_blank')
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      content: company.phone,
      color: "bg-green-500",
      action: () => window.open(`tel:${company.phone}`, '_self')
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      content: company.email,
      color: "bg-blue-500",
      action: () => window.open(`mailto:${company.email}`, '_self')
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
      color: "bg-orange-500",
      action: null
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
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
            className="bg-accent/10 text-accent font-semibold mb-6 font-sans"
            size="lg"
            radius="full"
            startContent={<MessageCircle className="h-4 w-4" />}
          >
            Contact Us
          </Chip>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-dark mb-6 md:mb-8 tracking-tight">
            Get in
            <span className="block text-accent">Touch</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-sans">
            Connect with our team for inquiries about veterinary pharmaceutical products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            >
              <Card className="bg-white backdrop-blur-sm border border-gray-200 h-full text-center hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={info.action || undefined}>
                <CardBody className="p-6 md:p-8">
                  <motion.div 
                    className={`${info.color} p-4 rounded-full text-white mx-auto mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {info.icon}
                  </motion.div>
                  <h4 className="text-xl md:text-2xl font-display font-bold text-primary-dark mb-4">
                    {info.title}
                  </h4>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed font-sans">
                    {info.content}
                  </p>
                  {info.action && (
                    <Button
                      className="mt-4 bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 font-sans"
                      radius="full"
                      size="sm"
                      endContent={<Send className="h-3 w-3" />}
                    >
                      Connect
                    </Button>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white backdrop-blur-sm border border-gray-200 shadow-2xl">
            <CardBody className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">
                  Send us a Message
                </h3>
                <p className="text-gray-600 text-lg font-sans">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary-dark font-medium mb-2 font-sans">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-primary-dark font-sans transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-primary-dark font-medium mb-2 font-sans">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-primary-dark font-sans transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-primary-dark font-medium mb-2 font-sans">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-primary-dark font-sans transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-primary-dark font-medium mb-2 font-sans">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-primary-dark font-sans transition-all duration-300"
                    placeholder="Enter subject"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-primary-dark font-medium mb-2 font-sans">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-primary-dark resize-none font-sans transition-all duration-300"
                    placeholder="Enter your message"
                  />
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button
                  className="bg-accent text-white font-semibold text-lg px-8 py-4 hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl font-sans"
                  radius="full"
                  size="lg"
                  endContent={<Send className="h-5 w-5" />}
                >
                  Send Message
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
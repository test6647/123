import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { User, MapPin, Award, Heart, Star, Trophy } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const About: React.FC = () => {
  const { company } = useAdmin();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const achievements = [
    { icon: <Trophy className="h-6 w-6" />, title: "10+ Years", subtitle: "Industry Experience" },
    { icon: <Star className="h-6 w-6" />, title: "500+", subtitle: "Satisfied Clients" },
    { icon: <Award className="h-6 w-6" />, title: "ISO", subtitle: "Certified Quality" },
    { icon: <Heart className="h-6 w-6" />, title: "24/7", subtitle: "Customer Support" }
  ];

  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Stringent quality control ensures every product meets international standards"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Animal Welfare",
      description: "Committed to improving animal health and welfare across all species"
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Expert Leadership",
      description: "Led by experienced professionals with deep veterinary knowledge"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Presence",
      description: "Serving Gujarat and beyond with reliable distribution network"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
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
          >
            About VET_X PHARMA
          </Chip>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-dark mb-6 md:mb-8 tracking-tight">
            Excellence in
            <span className="block text-accent">Veterinary Care</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-sans">
            {company.description}
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-12 md:mb-20"
        >
          <Card className="bg-white backdrop-blur-sm border border-gray-200 max-w-4xl mx-auto shadow-xl">
            <CardBody className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="text-center">
                  <Avatar
                    src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400"
                    className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 ring-4 ring-accent/20"
                  />
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-dark mb-2">{company.founder}</h3>
                  <Chip 
                    className="bg-accent text-white font-sans"
                    radius="full"
                  >
                    Founder & CEO
                  </Chip>
                </div>
                
                <div>
                  <h4 className="text-xl md:text-2xl font-display font-bold text-primary-dark mb-4 md:mb-6">Our Visionary Leader</h4>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-sans">
                    <strong>{company.founder}</strong> brings years of experience in veterinary 
                    pharmaceuticals, with a vision to provide premium quality medicines that 
                    veterinary professionals can trust. His commitment to excellence has made 
                    VET_X PHARMA a leading name in the industry.
                  </p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-5 w-5 mr-3 text-accent" />
                    <span className="text-base md:text-lg font-sans">{company.location}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20"
        >
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-white backdrop-blur-sm border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <CardBody className="p-4 md:p-8">
                <div className="text-accent mb-4 flex justify-center">
                  {achievement.icon}
                </div>
                <h4 className="text-lg md:text-2xl font-display font-bold text-primary-dark mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 font-medium text-sm md:text-base font-sans">
                  {achievement.subtitle}
                </p>
              </CardBody>
            </Card>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-white backdrop-blur-sm border border-gray-200 h-full hover:shadow-xl transition-all duration-300">
              <CardBody className="p-6 md:p-8">
                <div className="text-accent mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold text-primary-dark mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-sans">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
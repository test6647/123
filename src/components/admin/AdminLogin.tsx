import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Input, Button, Chip } from '@heroui/react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface LoginFormData {
  password: string;
}

const AdminLogin: React.FC = () => {
  const { login } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = login(data.password);
    if (!success) {
      setError('Invalid password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-primary-light flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.05, 1, 1.05],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-primary-dark/3 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-primary-dark backdrop-blur-lg border border-primary-dark/10 shadow-2xl">
          <CardBody className="p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.div
                className="bg-primary-light/10 rounded-full p-4 inline-block mb-6"
              >
                <Shield className="h-10 md:h-12 w-10 md:w-12 text-primary-light" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-primary-light mb-3">Admin Access</h2>
              <p className="text-primary-light/70 text-base md:text-lg">VET_X PHARMA Management Portal</p>
              
              <Chip 
                className="bg-primary-light/10 text-primary-light font-medium mt-4"
                radius="full"
                startContent={<Lock className="h-3 w-3" />}
              >
                Secure Login Required
              </Chip>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              <Input
                {...register('password', { required: 'Password is required' })}
                label="Admin Password"
                placeholder="Enter your admin password"
                type={showPassword ? 'text' : 'password'}
                startContent={<Lock className="h-4 w-4 text-primary-light/50" />}
                endContent={
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setShowPassword(!showPassword)}
                    className="text-primary-light/50 hover:text-primary-light/70"
                    size="sm"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                }
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                radius="lg"
                size="lg"
                classNames={{
                  input: "text-primary-light",
                  inputWrapper: "bg-primary-light/10 border-primary-light/20"
                }}
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-primary-light text-primary-dark font-bold text-base md:text-lg py-4 md:py-6 shadow-lg"
                radius="full"
                size="lg"
              >
                {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="text-primary-light/60 text-sm">
                Secure access to VET_X PHARMA admin panel
              </p>
              <p className="text-primary-light/50 text-xs mt-2">
                Contact system administrator for password recovery
              </p>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
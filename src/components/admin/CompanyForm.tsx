import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { Company } from '../../types';

interface CompanyFormData {
  name: string;
  founder: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

const CompanyForm: React.FC = () => {
  const { company, updateCompany } = useAdmin();
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormData>({
    defaultValues: company
  });

  const onSubmit = (data: CompanyFormData) => {
    updateCompany(data);
    alert('Company information updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary-dark/5 rounded-lg p-6 border border-primary-dark/20"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-primary-dark font-medium mb-2">Company Name</label>
          <input
            {...register('name', { required: 'Company name is required' })}
            type="text"
            className="w-full px-4 py-3 bg-primary-light border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/30 focus:border-transparent text-primary-dark"
            placeholder="Enter company name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-dark font-medium mb-2">Founder Name</label>
          <input
            {...register('founder', { required: 'Founder name is required' })}
            type="text"
            className="w-full px-4 py-3 bg-primary-light border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/30 focus:border-transparent text-primary-dark"
            placeholder="Enter founder name"
          />
          {errors.founder && (
            <p className="text-red-500 text-sm mt-1">{errors.founder.message}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-dark font-medium mb-2">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-4 py-3 bg-primary-light border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/30 focus:border-transparent text-primary-dark resize-none"
            placeholder="Enter company description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-dark font-medium mb-2">Location</label>
          <input
            {...register('location', { required: 'Location is required' })}
            type="text"
            className="w-full px-4 py-3 bg-primary-light border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/30 focus:border-transparent text-primary-dark"
            placeholder="Enter company location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-dark font-medium mb-2">Phone</label>
          <input
            {...register('phone', { required: 'Phone is required' })}
            type="tel"
            className="w-full px-4 py-3 bg-primary-light border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/30 focus:border-transparent text-primary-dark"
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-dark font-medium mb-2">Email</label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="w-full px-4 py-3 bg-primary-light border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/30 focus:border-transparent text-primary-dark"
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-dark text-primary-light py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Update Company Information
        </button>
      </form>
    </motion.div>
  );
};

export default CompanyForm;
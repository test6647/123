import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input, Textarea, Select, SelectItem, Button, Card, CardBody } from '@heroui/react';
import { Package, DollarSign, Tag, Image, FileText } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSuccess }) => {
  const { addProduct, updateProduct } = useAdmin();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductFormData>({
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    } : {
      name: '',
      description: '',
      price: 0,
      category: '',
      image: ''
    }
  });

  const categories = [
    'Antibiotics & Antimicrobials',
    'Vaccines & Biologicals',
    'Nutritional Supplements',
    'Surgical & Wound Care',
    'Parasiticides',
    'Reproductive Health'
  ];

  const onSubmit = (data: ProductFormData) => {
    if (product) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }
    onSuccess();
  };

  const watchedImage = watch('image');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        {/* Image Preview */}
        {watchedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-primary-dark border-primary-dark/10">
              <CardBody className="p-4">
                <img
                  src={watchedImage}
                  alt="Product preview"
                  className="w-full h-32 md:h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </CardBody>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <Input
            {...register('name', { required: 'Product name is required' })}
            label="Product Name"
            placeholder="Enter product name"
            startContent={<Package className="h-4 w-4 text-primary-dark/50" />}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            radius="lg"
            size="md"
            classNames={{
              input: "text-primary-dark",
              inputWrapper: "bg-primary-light border-primary-dark/20"
            }}
          />

          <Input
            {...register('price', { 
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Price must be positive' }
            })}
            label="Price (₹)"
            placeholder="Enter price"
            type="number"
            step="0.01"
            startContent={<DollarSign className="h-4 w-4 text-primary-dark/50" />}
            isInvalid={!!errors.price}
            errorMessage={errors.price?.message}
            radius="lg"
            size="md"
            classNames={{
              input: "text-primary-dark",
              inputWrapper: "bg-primary-light border-primary-dark/20"
            }}
          />
        </div>

        <Select
          {...register('category', { required: 'Category is required' })}
          label="Category"
          placeholder="Select category"
          startContent={<Tag className="h-4 w-4 text-primary-dark/50" />}
          isInvalid={!!errors.category}
          errorMessage={errors.category?.message}
          radius="lg"
          size="md"
          onSelectionChange={(keys) => {
            const selectedCategory = Array.from(keys)[0] as string;
            setValue('category', selectedCategory);
          }}
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>

        <Input
          {...register('image', { required: 'Image URL is required' })}
          label="Image URL"
          placeholder="Enter image URL"
          startContent={<Image className="h-4 w-4 text-primary-dark/50" />}
          isInvalid={!!errors.image}
          errorMessage={errors.image?.message}
          radius="lg"
          size="md"
          classNames={{
            input: "text-primary-dark",
            inputWrapper: "bg-primary-light border-primary-dark/20"
          }}
        />

        <Textarea
          {...register('description', { required: 'Description is required' })}
          label="Description"
          placeholder="Enter product description"
          startContent={<FileText className="h-4 w-4 text-primary-dark/50" />}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          radius="lg"
          size="md"
          minRows={3}
          classNames={{
            input: "text-primary-dark",
            inputWrapper: "bg-primary-light border-primary-dark/20"
          }}
        />

        <div className="flex flex-col md:flex-row gap-4 pt-4 md:pt-6">
          <Button
            type="submit"
            className="flex-1 bg-primary-dark text-primary-light font-semibold"
            radius="full"
            size="md"
          >
            {product ? 'Update Product' : 'Add Product'}
          </Button>
          <Button
            type="button"
            onPress={onClose}
            variant="bordered"
            className="flex-1 border-primary-dark/30 text-primary-dark hover:bg-primary-dark/10"
            radius="full"
            size="md"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;
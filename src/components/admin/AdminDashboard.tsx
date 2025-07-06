import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, CardBody, CardHeader, Button, Chip, Input, Select, SelectItem,
  Modal, ModalContent, ModalHeader, ModalBody, useDisclosure,
  Avatar, Divider
} from '@heroui/react';
import { 
  Package, Plus, Edit3, Trash2, LogOut, Search, Filter, 
  MoreVertical, Eye, TrendingUp, DollarSign
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import ProductForm from './ProductForm';

const AdminDashboard: React.FC = () => {
  const { products, logout, deleteProduct } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleEditProduct = (productId: string) => {
    setEditingProduct(productId);
    onEditOpen();
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Package className="h-6 w-6" />,
      color: "bg-primary-dark"
    },
    {
      title: "Categories",
      value: new Set(products.map(p => p.category)).size,
      icon: <Filter className="h-6 w-6" />,
      color: "bg-primary-dark"
    },
    {
      title: "Avg. Price",
      value: `₹${Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length || 0)}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-primary-dark"
    },
    {
      title: "Total Value",
      value: `₹${products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-primary-dark"
    }
  ];

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-primary-dark shadow-2xl border-b border-primary-light/20"
      >
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-2xl md:text-4xl font-bold text-primary-light mb-1 md:mb-2">Admin Dashboard</h1>
              <p className="text-primary-light/70 text-sm md:text-lg">VET_X PHARMA Management Panel</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-2 md:gap-4"
            >
              <Avatar
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400"
                size="md"
                className="ring-2 ring-primary-light/30"
              />
              <div className="text-right hidden md:block">
                <p className="text-primary-light font-semibold text-sm">Admin User</p>
                <p className="text-primary-light/70 text-xs">VET_X PHARMA</p>
              </div>
              <Button
                onPress={logout}
                variant="bordered"
                className="border-primary-light/30 text-primary-light hover:bg-primary-light/10"
                radius="full"
                size="sm"
                startContent={<LogOut className="h-4 w-4" />}
              >
                <span className="hidden md:inline">Logout</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-primary-dark border-primary-dark/10">
              <CardBody className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <p className="text-primary-light/70 text-xs md:text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-lg md:text-3xl font-bold text-primary-light">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-2 md:p-3 rounded-full text-primary-light w-fit`}>
                    {stat.icon}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-primary-dark border-primary-dark/10">
            <CardHeader className="p-4 md:p-6 pb-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 w-full">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-primary-light mb-1 md:mb-2">Product Management</h2>
                  <p className="text-primary-light/70 text-sm md:text-base">Manage your veterinary pharmaceutical products</p>
                </div>
                
                <Button
                  onPress={onOpen}
                  className="bg-primary-light text-primary-dark font-semibold"
                  radius="full"
                  size="md"
                  startContent={<Plus className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  Add Product
                </Button>
              </div>
            </CardHeader>

            <CardBody className="p-4 md:p-6">
              {/* Search and Filter */}
              <div className="flex flex-col gap-4 mb-6 md:mb-8">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startContent={<Search className="h-4 md:h-5 w-4 md:w-5 text-primary-light/50" />}
                  radius="full"
                  size="md"
                  classNames={{
                    input: "text-primary-light",
                    inputWrapper: "bg-primary-light/10 border-primary-light/20"
                  }}
                />
                
                <Select
                  placeholder="Filter by category"
                  selectedKeys={[selectedCategory]}
                  onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] as string)}
                  radius="full"
                  size="md"
                  startContent={<Filter className="h-4 w-4" />}
                >
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Products Grid - Mobile Optimized */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="bg-primary-light border-primary-light/10">
                      <CardBody className="p-4">
                        <div className="flex items-start gap-3 mb-4">
                          <Avatar
                            src={product.image}
                            size="lg"
                            radius="lg"
                            className="ring-2 ring-primary-dark/10 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-primary-dark text-sm md:text-base line-clamp-2 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-primary-dark/70 text-xs md:text-sm line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <Chip 
                              className="bg-primary-dark/10 text-primary-dark text-xs"
                              radius="full"
                              size="sm"
                            >
                              {product.category}
                            </Chip>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg md:text-xl font-bold text-primary-dark">₹{product.price}</span>
                          <div className="flex gap-2">
                            <Button
                              isIconOnly
                              variant="bordered"
                              className="border-primary-dark/30 text-primary-dark"
                              radius="full"
                              size="sm"
                              onPress={() => handleEditProduct(product.id)}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              isIconOnly
                              variant="bordered"
                              className="border-red-300 text-red-600"
                              radius="full"
                              size="sm"
                              onPress={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 md:py-20">
                  <Package className="h-12 md:h-20 w-12 md:w-20 text-primary-light/30 mx-auto mb-4 md:mb-6" />
                  <h3 className="text-lg md:text-2xl font-bold text-primary-light mb-2 md:mb-4">No Products Found</h3>
                  <p className="text-primary-light/70 text-sm md:text-lg mb-6 md:mb-8">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'No products match your current filters.' 
                      : 'Start by adding your first product.'}
                  </p>
                  <Button
                    onPress={onOpen}
                    className="bg-primary-light text-primary-dark font-semibold"
                    radius="full"
                    size="md"
                    startContent={<Plus className="h-4 w-4" />}
                  >
                    Add Your First Product
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Add Product Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          backdrop: "bg-primary-dark/50 backdrop-blur-sm",
          base: "bg-primary-light border border-primary-dark/20 mx-4",
          header: "border-b border-primary-dark/10",
          body: "py-6",
          footer: "border-t border-primary-dark/10"
        }}
      >
        <ModalContent>
          <ModalHeader className="text-xl md:text-2xl font-bold text-primary-dark">
            Add New Product
          </ModalHeader>
          <ModalBody>
            <ProductForm onClose={onClose} onSuccess={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Product Modal */}
      <Modal 
        isOpen={isEditOpen} 
        onClose={onEditClose}
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          backdrop: "bg-primary-dark/50 backdrop-blur-sm",
          base: "bg-primary-light border border-primary-dark/20 mx-4",
          header: "border-b border-primary-dark/10",
          body: "py-6",
          footer: "border-t border-primary-dark/10"
        }}
      >
        <ModalContent>
          <ModalHeader className="text-xl md:text-2xl font-bold text-primary-dark">
            Edit Product
          </ModalHeader>
          <ModalBody>
            {editingProduct && (
              <ProductForm 
                product={products.find(p => p.id === editingProduct)}
                onClose={onEditClose} 
                onSuccess={onEditClose} 
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
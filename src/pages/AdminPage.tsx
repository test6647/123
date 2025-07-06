import React from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage: React.FC = () => {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;
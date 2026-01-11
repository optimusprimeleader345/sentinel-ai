import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles, redirectPath }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-slate-400 text-lg">Authenticating...</p>
        </motion.div>
      </div>
    );
  }

  // If no user is logged in, redirect to appropriate login path
  if (!user) {
    if (allowedRoles.includes('superadmin')) {
      return <Navigate to="/login/super-admin" state={{ from: location }} replace />;
    }
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/login/admin" state={{ from: location }} replace />;
    }
    return <Navigate to="/login/user" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    // User doesn't have access - redirect to their appropriate dashboard
    const correctPath = user.role === 'superadmin' ? '/super-admin/dashboard' :
                       user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={correctPath} replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();

  console.log('AdminRoute: Current state', { user, authLoading, isAdmin, adminLoading });

  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (!user) {
    console.log('AdminRoute: No user found, redirecting to login');
    toast.error('Please log in to access the admin portal');
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    console.log('AdminRoute: User is not admin, redirecting to home');
    toast.error('You do not have admin permissions');
    return <Navigate to="/" replace />;
  }

  console.log('AdminRoute: Access granted to admin area');
  return <>{children}</>;
};
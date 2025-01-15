import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export function useAdmin() {
  const { user } = useAuth();
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsUserAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log('Checking admin status for user:', user.id);
        const { data, error } = await supabase.rpc('is_admin', {
          user_id: user.id
        });

        if (error) {
          console.error('Error checking admin status:', error);
          toast.error('Error checking admin permissions');
          throw error;
        }

        console.log('Admin status result:', data);
        setIsUserAdmin(!!data);
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsUserAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin: isUserAdmin, loading };
}
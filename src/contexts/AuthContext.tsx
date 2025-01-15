import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { NetworkError, AuthenticationError } from "@/lib/supabase/errors";
import { useSupabaseConnection } from "@/lib/supabase/hooks";
import { useAdmin } from "@/hooks/useAdmin";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useSupabaseConnection();
  const { isAdmin, loading: adminLoading } = useAdmin();

  const handleInitialRedirect = async (currentUser: User) => {
    if (location.pathname === '/login') {
      const adminStatus = await isAdmin;
      if (adminStatus) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }

        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          console.log("Session recovered successfully");
          await handleInitialRedirect(initialSession.user);
        }
      } catch (error) {
        console.error("Error in auth initialization:", error);
        if (error instanceof NetworkError) {
          toast.error("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("Auth state changed:", event);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (event === 'SIGNED_IN' && currentSession?.user) {
        await handleInitialRedirect(currentSession.user);
      }
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        navigate('/login');
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, isAdmin, location.pathname]);

  const signIn = async (email: string, password: string) => {
    if (!isConnected) {
      toast.error("Unable to connect to the server. Please try again later.");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Attempting sign in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
      
      console.log("Sign in successful:", data);
      const adminStatus = await isAdmin;
      
      if (adminStatus) {
        toast.success("Welcome back, Admin!");
        navigate("/admin");
      } else {
        toast.success("Successfully signed in!");
        navigate("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      
      if (error instanceof NetworkError) {
        toast.error("Network error. Please check your connection.");
      } else if (error instanceof AuthError) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid email or password. Please check your credentials.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Failed to sign in. Please try again.");
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        toast.error("Error during sign out");
        throw error;
      }
      
      // Clear auth state
      setUser(null);
      setSession(null);
      
      // Show success message and redirect
      toast.success("Successfully signed out");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error during sign out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
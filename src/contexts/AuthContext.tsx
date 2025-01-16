import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { NetworkError, AuthenticationError } from "@/lib/supabase/errors";
import { useSupabaseConnection } from "@/lib/supabase/hooks";

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

  const handleInitialRedirect = async (currentUser: User) => {
    if (location.pathname === '/login') {
      const isAdmin = currentUser?.user_metadata?.role === 'admin';
      console.log('Checking admin status:', { isAdmin, metadata: currentUser?.user_metadata });
      
      if (isAdmin) {
        console.log('Redirecting to admin dashboard');
        navigate('/admin');
      } else {
        console.log('Redirecting to user dashboard');
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
  }, [navigate, location.pathname]);

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
      
      const isAdmin = data.user?.user_metadata?.role === 'admin';
      console.log('User admin status:', isAdmin);
      
      if (isAdmin) {
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
      
      // Clear auth state first
      setUser(null);
      setSession(null);
      
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        // Even if there's an error, we'll continue with the local cleanup
        if (error.message !== "session_not_found") {
          toast.error("Error during sign out");
        }
      }
      
      // Always redirect and show success message
      toast.success("Successfully signed out");
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.error("Sign out error:", error);
      // Continue with local cleanup even if there's an error
      toast.error("Error during sign out, but session cleared locally");
      navigate("/login", { replace: true });
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
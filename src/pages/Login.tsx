import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const { signIn } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailNotConfirmed(false);
    
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      await signIn(email, password);
      
      // The redirect will be handled in AuthContext based on admin status
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Failed to sign in. Please try again.";
      
      if (error instanceof AuthError) {
        switch (error.message) {
          case "Email not confirmed":
            setEmailNotConfirmed(true);
            errorMessage = "Please verify your email before logging in.";
            break;
          case "Invalid login credentials":
            errorMessage = "Invalid email or password. Please check your credentials.";
            break;
          case "Invalid email or password":
            errorMessage = "Invalid email or password. Please check your credentials.";
            break;
          default:
            errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* Background Logo */}
      <div 
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png')",
          backgroundSize: "50%",
          filter: "grayscale(100%)"
        }}
      />
      
      {/* Login Form */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl relative z-10">
        <img 
          src="/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png"
          alt="BSA Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center text-gray-900">BSA Donor Platform</h1>
          <h2 className="text-xl text-center text-gray-600">Login</h2>
        </div>

        {emailNotConfirmed && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              Please verify your email address before logging in. Check your inbox for the verification link.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your email"
              className="bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your password"
              className="bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            />
          </div>
          <div className="text-right">
            <Link 
              to="/reset-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Button
            variant="outline"
            className="mt-2 w-full bg-gradient-to-r from-[#1a365d] to-[#0d9488] hover:from-[#1a365d]/90 hover:to-[#0d9488]/90 text-white border-0 transition-all duration-200 ease-in-out hover:shadow-lg"
            onClick={() => navigate("/register")}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
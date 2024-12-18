import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

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
      await signIn(email, password);
      
      // Check if user is admin and redirect accordingly
      if (isAdmin) {
        console.log("Admin user detected, redirecting to admin dashboard");
        navigate("/admin");
        toast({
          title: "Welcome back, Admin!",
          description: "You have successfully logged in to the admin dashboard.",
        });
      } else {
        console.log("Donor user detected, redirecting to donor dashboard");
        navigate("/");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in to your donor portal.",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message?.includes('email_not_confirmed') || 
          error?.body?.includes('email_not_confirmed')) {
        setEmailNotConfirmed(true);
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please check your email and verify your account before logging in.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your email and password and try again.",
        });
      }
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
            className="mt-2 w-full border-gray-300 text-gray-700 hover:bg-gray-50"
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
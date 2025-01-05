import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import { publicRoutes } from "@/config/routes/publicRoutes";
import { userRoutes } from "@/config/routes/userRoutes";
import { adminRoutes } from "@/config/routes/adminRoutes";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes (login, register, etc.) */}
              {publicRoutes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
              
              {/* User routes (protected) */}
              {userRoutes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
              
              {/* Admin routes (protected + admin only) */}
              {adminRoutes.map((route) => (
                <Route key={route.path} {...route} />
              ))}

              {/* Redirect unmatched routes to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
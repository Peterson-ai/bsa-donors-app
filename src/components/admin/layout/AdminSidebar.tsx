import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { adminNavigationItems } from "@/config/admin-navigation";
import { LogOut, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <aside className={cn(
      "w-64 bg-[#0D1425] border-r border-gray-800 h-screen fixed left-0 top-0 z-50 transition-transform duration-300 transform",
      "lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/d73c5a4d-124a-4e2e-b3e8-4af49f90719d.png"
              alt="BSA Logo" 
              className="h-10 w-10"
            />
            <span className="text-lg font-semibold text-white">Admin Portal</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        <nav className="space-y-1">
          {adminNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-[#1A2235] text-[#6366F1]" 
                    : "text-gray-400 hover:bg-[#1A2235] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start space-x-3 text-gray-400 hover:text-white hover:bg-[#1A2235]"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};
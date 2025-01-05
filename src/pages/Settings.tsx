import { Button } from "@/components/ui/button";
import { ProfileSettingsSection } from "@/components/settings/ProfileSettingsSection";
import { NotificationSettingsSection } from "@/components/settings/NotificationSettingsSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  const handleSaveChanges = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <div className="space-y-6">
        <ProfileSettingsSection />
        
        <div className="bg-[#1A2235] border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Dark Mode</Label>
              <p className="text-sm text-gray-400">
                Toggle between light and dark themes
              </p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>

        <NotificationSettingsSection />
        <PreferencesSection />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveChanges}
          className="bg-[#6366F1] hover:bg-[#5558DD]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
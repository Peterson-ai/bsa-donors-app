import { Settings as SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PreferencesSection = () => {
  const { theme, toggleTheme, language, setLanguage } = useTheme();

  return (
    <Card className="p-6 bg-[#0D1425] border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-5 w-5 text-[#6366F1]" />
        <h2 className="text-lg font-medium text-white">Preferences</h2>
      </div>

      <div className="space-y-6">
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

        <div className="space-y-2">
          <Label className="text-white">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="bg-[#1A2235] border-gray-700 text-white">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A2235] border-gray-700">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
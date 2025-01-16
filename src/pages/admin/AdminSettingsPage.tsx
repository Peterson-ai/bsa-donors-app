import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminSettingsPage = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Admin Settings</h1>

      <div className="grid gap-6">
        <Card className="bg-[#1A2235] border-gray-800">
          <div className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Email Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">New Donation Alerts</Label>
                  <p className="text-sm text-[#D6BCFA]">
                    Receive notifications for new donations
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Campaign Updates</Label>
                  <p className="text-sm text-[#D6BCFA]">
                    Get notified about campaign milestones
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A2235] border-gray-800">
          <div className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Two-Factor Authentication</Label>
                <div className="flex items-center mt-2">
                  <Switch />
                  <span className="ml-2 text-sm text-[#D6BCFA]">Enable 2FA</span>
                </div>
              </div>
              <div>
                <Label className="text-white">Session Timeout (minutes)</Label>
                <Input 
                  type="number" 
                  defaultValue="30"
                  className="mt-2 bg-[#0D1425] border-gray-700 text-white"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A2235] border-gray-800">
          <div className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">System Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Maintenance Mode</Label>
                  <p className="text-sm text-[#D6BCFA]">
                    Temporarily disable user access
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Debug Mode</Label>
                  <p className="text-sm text-[#D6BCFA]">
                    Enable detailed error logging
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-[#6366F1] hover:bg-[#5558DD] text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
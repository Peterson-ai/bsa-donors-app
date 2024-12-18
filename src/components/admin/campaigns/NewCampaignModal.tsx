import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewCampaignModal = ({ isOpen, onClose }: NewCampaignModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: "",
    start_date: "",
    end_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('campaigns')
        .insert([{
          ...formData,
          goal: parseFloat(formData.goal),
          raised: 0,
          status: 'active'
        }]);

      if (error) throw error;

      toast.success("Campaign created successfully!");
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      onClose();
      setFormData({
        name: "",
        description: "",
        goal: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A2235] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Create New Campaign</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Campaign Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#0D1425] border-gray-700 text-white mt-1.5"
                placeholder="Enter campaign name"
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-[#0D1425] border-gray-700 text-white mt-1.5"
                placeholder="Enter campaign description"
                required
              />
            </div>

            <div>
              <Label>Fundraising Goal ($)</Label>
              <Input
                name="goal"
                type="number"
                value={formData.goal}
                onChange={handleChange}
                className="bg-[#0D1425] border-gray-700 text-white mt-1.5"
                placeholder="Enter goal amount"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="bg-[#0D1425] border-gray-700 text-white mt-1.5"
                  required
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="bg-[#0D1425] border-gray-700 text-white mt-1.5"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#6366F1] hover:bg-[#5558DD]"
            >
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
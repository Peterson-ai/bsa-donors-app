import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { NewCampaignModal } from "@/components/admin/campaigns/NewCampaignModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";

const CampaignsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Campaign[];
    },
  });

  const filteredCampaigns = campaigns?.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Campaign Management</h1>
        <Button 
          className="bg-[#6366F1] hover:bg-[#5558DD]"
          onClick={() => setIsNewCampaignModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <Card className="bg-[#1A2235] border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0D1425] border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Goal</TableHead>
                  <TableHead className="text-gray-400">Raised</TableHead>
                  <TableHead className="text-gray-400">Progress</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Start Date</TableHead>
                  <TableHead className="text-gray-400">End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400">
                      Loading campaigns...
                    </TableCell>
                  </TableRow>
                ) : filteredCampaigns?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400">
                      No campaigns found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCampaigns?.map((campaign) => (
                    <TableRow key={campaign.id} className="border-gray-800">
                      <TableCell className="text-white font-medium">
                        {campaign.name}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {formatCurrency(campaign.goal)}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {formatCurrency(campaign.raised)}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {((campaign.raised / campaign.goal) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          campaign.status === 'active'
                            ? 'bg-green-500/10 text-green-500'
                            : campaign.status === 'completed'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {campaign.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {new Date(campaign.start_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {new Date(campaign.end_date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      <NewCampaignModal 
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
      />
    </div>
  );
};

export default CampaignsManagementPage;
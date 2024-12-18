import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";
import { useState } from "react";

const DonorProfilingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: donorProfiles, isLoading } = useQuery({
    queryKey: ['donor-profiles'],
    queryFn: async () => {
      // Simulated data - replace with actual API call
      return [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          totalDonations: 5000,
          engagementLevel: 'High',
          lastDonation: '2024-03-15',
          riskOfChurn: 0.2,
          nextPredictedDonation: 750,
          preferredCampaigns: ['Summer Camp', 'Equipment Drive']
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          totalDonations: 3200,
          engagementLevel: 'Low',
          lastDonation: '2024-02-28',
          riskOfChurn: 0.4,
          nextPredictedDonation: 500,
          preferredCampaigns: ['Leadership Training']
        },
        {
          id: '3',
          name: 'Michael Brown',
          email: 'michael@example.com',
          totalDonations: 8500,
          engagementLevel: 'High',
          lastDonation: '2024-03-20',
          riskOfChurn: 0.1,
          nextPredictedDonation: 1000,
          preferredCampaigns: ['Summer Camp', 'Equipment Drive', 'Leadership Training']
        }
      ];
    }
  });

  const filteredProfiles = donorProfiles?.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Donor Profiling</h1>
      </div>

      <Card className="bg-[#1A2235] border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search donors..."
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
                  <TableHead className="text-gray-400">Donor</TableHead>
                  <TableHead className="text-gray-400">Total Donations</TableHead>
                  <TableHead className="text-gray-400">Engagement Level</TableHead>
                  <TableHead className="text-gray-400">Last Donation</TableHead>
                  <TableHead className="text-gray-400">Risk of Churn</TableHead>
                  <TableHead className="text-gray-400">Next Predicted</TableHead>
                  <TableHead className="text-gray-400">Preferred Campaigns</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400">
                      Loading donor profiles...
                    </TableCell>
                  </TableRow>
                ) : filteredProfiles?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400">
                      No donor profiles found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfiles?.map((profile) => (
                    <TableRow key={profile.id} className="border-gray-800">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{profile.name}</div>
                          <div className="text-sm text-gray-400">{profile.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">
                        {formatCurrency(profile.totalDonations)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          profile.engagementLevel === 'High'
                            ? 'bg-green-500/10 text-green-500'
                            : profile.engagementLevel === 'Medium'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {profile.engagementLevel}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {new Date(profile.lastDonation).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className={`${
                          profile.riskOfChurn > 0.7 
                            ? 'text-red-500' 
                            : profile.riskOfChurn > 0.3 
                            ? 'text-yellow-500' 
                            : 'text-green-500'
                        }`}>
                          {(profile.riskOfChurn * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-white">
                        {formatCurrency(profile.nextPredictedDonation)}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        <div className="flex flex-wrap gap-1">
                          {profile.preferredCampaigns.map((campaign) => (
                            <span 
                              key={campaign}
                              className="px-2 py-0.5 text-xs bg-[#6366F1]/10 text-[#6366F1] rounded-full"
                            >
                              {campaign}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DonorProfilingPage;
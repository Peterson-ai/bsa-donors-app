import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { supabase } from "@/lib/supabase";

export const BasicMetrics = () => {
  // Fetch campaigns total
  const { data: campaignsTotal } = useQuery({
    queryKey: ['campaigns-total'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('raised')
        .not('raised', 'is', null);
      
      if (error) throw error;
      return data.reduce((sum, campaign) => sum + (campaign.raised || 0), 0);
    }
  });

  // Fetch donations total
  const { data: donationsTotal } = useQuery({
    queryKey: ['donations-total'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('amount')
        .not('amount', 'is', null);
      
      if (error) throw error;
      return data.reduce((sum, donation) => sum + (donation.amount || 0), 0);
    }
  });

  // Fetch total number of donors
  const { data: totalDonors } = useQuery({
    queryKey: ['total-donors'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('donors')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Calculate totals and averages
  const totalDonations = (campaignsTotal || 0) + (donationsTotal || 0);
  const averageDonation = totalDonors && totalDonors > 0 
    ? totalDonations / totalDonors 
    : 0;

  return (
    <Card className="p-6 bg-[#1A2235] border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Basic Metrics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0D1425] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Combined Donations</span>
            <span className="text-blue-400">$</span>
          </div>
          <p className="text-xl font-bold text-white">{formatCurrency(totalDonations)}</p>
        </div>
        <div className="bg-[#0D1425] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Average Donation</span>
            <span className="text-purple-400">$</span>
          </div>
          <p className="text-xl font-bold text-white">{formatCurrency(averageDonation)}</p>
        </div>
        <div className="bg-[#0D1425] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Donors</span>
            <span className="text-green-400">#</span>
          </div>
          <p className="text-xl font-bold text-white">{totalDonors || 0}</p>
        </div>
      </div>
    </Card>
  );
};
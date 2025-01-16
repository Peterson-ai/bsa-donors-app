import { useQuery } from "@tanstack/react-query";
import { DollarSign, Users, Flag, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/admin/stats/StatCard";
import { DonationChart } from "@/components/admin/charts/DonationChart";
import { formatCurrency } from "@/utils/formatters";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { startOfMonth, subMonths, format } from "date-fns";

const AdminDashboard = () => {
  // Fetch total donations
  const { data: totalDonations } = useQuery({
    queryKey: ['total-donations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donors')
        .select('donation_amount');
      
      if (error) throw error;
      return data.reduce((sum, donor) => sum + (donor.donation_amount || 0), 0);
    }
  });

  // Fetch active donors count
  const { data: activeDonorsCount } = useQuery({
    queryKey: ['active-donors'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Fetch campaigns count
  const { data: campaignsCount } = useQuery({
    queryKey: ['campaigns-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Fetch monthly donation trends
  const { data: monthlyTrends } = useQuery({
    queryKey: ['monthly-trends'],
    queryFn: async () => {
      const last12Months = Array.from({ length: 12 }, (_, i) => {
        const date = subMonths(new Date(), i);
        return {
          startDate: startOfMonth(date),
          month: format(date, 'MMM')
        };
      }).reverse();

      const { data: donations, error } = await supabase
        .from('donors')
        .select('donation_amount, created_at');

      if (error) throw error;

      return last12Months.map(({ month, startDate }) => {
        const monthDonations = donations?.filter(donation => 
          new Date(donation.created_at) >= startDate &&
          new Date(donation.created_at) < new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
        );

        const amount = monthDonations?.reduce((sum, donation) => 
          sum + (donation.donation_amount || 0), 0
        ) || 0;

        return { month, amount };
      });
    }
  });

  // Calculate monthly growth
  const monthlyGrowth = monthlyTrends?.length >= 2 
    ? Number(((monthlyTrends[monthlyTrends.length - 1].amount - 
        monthlyTrends[monthlyTrends.length - 2].amount) / 
        monthlyTrends[monthlyTrends.length - 2].amount * 100).toFixed(1))
    : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Donations"
          value={formatCurrency(totalDonations || 0)}
          icon={DollarSign}
        />
        <StatCard
          title="Active Donors"
          value={activeDonorsCount || 0}
          icon={Users}
        />
        <StatCard
          title="Campaigns"
          value={campaignsCount || 0}
          icon={Flag}
        />
        <StatCard
          title="Monthly Growth"
          value={`${monthlyGrowth}%`}
          change={monthlyGrowth > 0 ? 
            { value: monthlyGrowth, trend: 'up' } : 
            { value: Math.abs(monthlyGrowth), trend: 'down' }
          }
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#1A2235] border-gray-800">
          <DonationChart data={monthlyTrends || []} />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
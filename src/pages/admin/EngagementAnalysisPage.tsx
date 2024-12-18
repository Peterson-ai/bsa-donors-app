import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/utils/formatters";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DateRange } from "@/components/ui/date-range";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

const EngagementAnalysisPage = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['donor-analytics', dateRange],
    queryFn: async () => {
      // Simulated data - replace with actual API call
      return {
        totalDonations: 125000,
        averageDonation: 386,
        donorRetentionRate: 78.5,
        newDonorsThisMonth: 45,
        donorSegments: [
          { name: 'Major Donors', value: 30, color: '#6366F1' },
          { name: 'Regular Donors', value: 45, color: '#10B981' },
          { name: 'Occasional Donors', value: 25, color: '#F59E0B' }
        ],
        monthlyTrends: [
          { month: 'Jan', amount: 15000 },
          { month: 'Feb', amount: 18000 },
          { month: 'Mar', amount: 12000 },
          { month: 'Apr', amount: 21000 },
          { month: 'May', amount: 16000 },
          { month: 'Jun', amount: 19000 }
        ]
      };
    }
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Donor Analytics</h1>
        <div className="flex items-center gap-4">
          <DateRange value={dateRange} onChange={setDateRange} />
          <Button className="bg-[#6366F1] hover:bg-[#5558DD]">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1A2235] border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Donations</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {formatCurrency(analyticsData?.totalDonations || 0)}
          </p>
          <p className="text-sm text-emerald-500 mt-1">+14.5% from last month</p>
        </Card>

        <Card className="bg-[#1A2235] border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-400">Average Donation</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {formatCurrency(analyticsData?.averageDonation || 0)}
          </p>
          <p className="text-sm text-emerald-500 mt-1">+5.2% from last month</p>
        </Card>

        <Card className="bg-[#1A2235] border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-400">Donor Retention</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {analyticsData?.donorRetentionRate}%
          </p>
          <p className="text-sm text-emerald-500 mt-1">+2.3% from last month</p>
        </Card>

        <Card className="bg-[#1A2235] border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-400">New Donors</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {analyticsData?.newDonorsThisMonth}
          </p>
          <p className="text-sm text-emerald-500 mt-1">+8 from last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1A2235] border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Donation Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData?.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="month" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A2235',
                    border: '1px solid #2D3748',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="amount" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#1A2235] border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Donor Segments</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData?.donorSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData?.donorSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A2235',
                    border: '1px solid #2D3748',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {analyticsData?.donorSegments.map((segment, index) => (
              <div key={segment.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-gray-400">{segment.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EngagementAnalysisPage;
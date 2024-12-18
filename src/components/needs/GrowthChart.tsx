import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GrowthDataPoint {
  year: number;
  target: number;
}

interface GrowthChartProps {
  data: GrowthDataPoint[];
}

export const GrowthChart = ({ data }: GrowthChartProps) => {
  return (
    <Card className="bg-[#1A2235] border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Growth Targets</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis 
              dataKey="year" 
              stroke="#718096"
              tick={{ fill: '#718096' }}
            />
            <YAxis 
              stroke="#718096"
              tick={{ fill: '#718096' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A2235',
                border: '1px solid #2D3748',
                borderRadius: '0.5rem'
              }}
            />
            <Bar dataKey="target" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
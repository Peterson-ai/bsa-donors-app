import { Card } from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const StatisticsCard = ({ title, value, subtitle, icon }: StatisticsCardProps) => {
  return (
    <Card className="bg-[#1A2235] border-gray-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold text-white">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {icon && (
          <div className="text-[#6366F1]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
import { Card } from "@/components/ui/card";

interface ProgramCardProps {
  name: string;
  description: string;
  ageRange: string;
  type: string;
}

export const ProgramCard = ({ name, description, ageRange, type }: ProgramCardProps) => {
  return (
    <Card className="bg-[#1A2235] border-gray-800 p-6">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
        <div className="flex gap-2 mb-3">
          <span className="px-2 py-1 bg-[#6366F1]/10 text-[#6366F1] text-xs rounded-full">
            {ageRange}
          </span>
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-full">
            {type}
          </span>
        </div>
        <p className="text-gray-400 text-sm flex-grow">{description}</p>
      </div>
    </Card>
  );
};
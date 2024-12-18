import { Card } from "@/components/ui/card";

interface BadgeSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const BadgeSection = ({ title, description, children }: BadgeSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
};
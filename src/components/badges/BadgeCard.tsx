import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  name: string;
  description: string;
  level: "bronze" | "silver" | "gold" | "diamond";
  icon: string;
  earnedDate?: string;
  progress?: number;
}

const levelColors = {
  bronze: "from-orange-400 to-orange-600",
  silver: "from-gray-300 to-gray-500",
  gold: "from-yellow-400 to-yellow-600",
  diamond: "from-blue-300 to-blue-500"
};

export const BadgeCard = ({ name, description, level, icon, earnedDate, progress }: BadgeCardProps) => {
  const isEarned = !!earnedDate;

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105",
      isEarned ? "bg-[#1A2235] border-gray-700" : "bg-gray-900/50 border-gray-800"
    )}>
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full bg-gradient-to-b",
        levelColors[level]
      )} />
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br",
            levelColors[level],
            !isEarned && "opacity-50"
          )}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className={cn(
              "font-semibold",
              isEarned ? "text-white" : "text-gray-400"
            )}>{name}</h3>
            <p className="text-sm text-gray-500">{level.charAt(0).toUpperCase() + level.slice(1)} Level</p>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">{description}</p>

        {isEarned ? (
          <div className="text-sm text-gray-400">
            Earned on {new Date(earnedDate).toLocaleDateString()}
          </div>
        ) : progress ? (
          <div className="space-y-2">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full bg-gradient-to-r",
                  levelColors[level]
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{progress}% Complete</p>
          </div>
        ) : null}
      </div>
    </Card>
  );
};
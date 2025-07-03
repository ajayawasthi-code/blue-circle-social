
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Thermometer, Monitor, User } from "lucide-react";

interface HealthMetricsCardProps {
  title: string;
  value: string;
  icon: "heart" | "activity" | "thermometer" | "monitor" | "user";
  trend: string;
  trendPositive: boolean;
  onClick: () => void;
}

const iconMap = {
  heart: Heart,
  activity: Activity,
  thermometer: Thermometer,
  monitor: Monitor,
  user: User,
};

export const HealthMetricsCard = ({
  title,
  value,
  icon,
  trend,
  trendPositive,
  onClick
}: HealthMetricsCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:scale-105 bg-white border"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${
            trendPositive ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <span className={`text-sm font-medium ${
            trendPositive ? "text-green-600" : "text-red-600"
          }`}>
            {trend}
          </span>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
};

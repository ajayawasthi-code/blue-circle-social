
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockChartData = {
  heartRate: [
    { date: "Jul 1", value: 70 },
    { date: "Jul 3", value: 72 },
    { date: "Jul 5", value: 68 },
    { date: "Jul 7", value: 74 },
    { date: "Jul 9", value: 72 },
    { date: "Jul 11", value: 71 },
    { date: "Jul 13", value: 73 },
  ],
  bloodPressure: [
    { date: "Jul 1", value: 118 },
    { date: "Jul 3", value: 120 },
    { date: "Jul 5", value: 122 },
    { date: "Jul 7", value: 119 },
    { date: "Jul 9", value: 121 },
    { date: "Jul 11", value: 120 },
    { date: "Jul 13", value: 118 },
  ],
  weight: [
    { date: "Jul 1", value: 152 },
    { date: "Jul 3", value: 151 },
    { date: "Jul 5", value: 150 },
    { date: "Jul 7", value: 151 },
    { date: "Jul 9", value: 150 },
    { date: "Jul 11", value: 149 },
    { date: "Jul 13", value: 150 },
  ],
};

interface HealthTrendChartProps {
  selectedMetric: string;
}

export const HealthTrendChart = ({ selectedMetric }: HealthTrendChartProps) => {
  const getChartData = () => {
    switch (selectedMetric) {
      case "heartRate":
        return mockChartData.heartRate;
      case "bloodPressure":
        return mockChartData.bloodPressure;
      case "weight":
        return mockChartData.weight;
      default:
        return mockChartData.heartRate;
    }
  };

  const getTitle = () => {
    switch (selectedMetric) {
      case "heartRate":
        return "Heart Rate Trend (BPM)";
      case "bloodPressure":
        return "Blood Pressure Trend (Systolic)";
      case "weight":
        return "Weight Trend (lbs)";
      default:
        return "Health Metric Trend";
    }
  };

  return (
    <Card className="bg-white border">
      <CardHeader>
        <CardTitle className="text-xl">{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

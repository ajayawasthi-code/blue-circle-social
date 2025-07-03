
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Pill, Camera, FileText, Bell } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: Plus, label: "Record Vitals", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: Calendar, label: "Book Appointment", color: "bg-green-500 hover:bg-green-600" },
    { icon: Pill, label: "Log Medication", color: "bg-purple-500 hover:bg-purple-600" },
    { icon: Camera, label: "Upload Report", color: "bg-orange-500 hover:bg-orange-600" },
    { icon: FileText, label: "View Records", color: "bg-indigo-500 hover:bg-indigo-600" },
    { icon: Bell, label: "Set Reminder", color: "bg-pink-500 hover:bg-pink-600" },
  ];

  return (
    <Card className="bg-white border">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-20 flex-col space-y-2 ${action.color} text-white border-0 hover:scale-105 transition-transform`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <Card className="bg-white border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
            <p className="text-sm text-gray-600">{appointment.specialty}</p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {appointment.type}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(appointment.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {appointment.time}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            Reschedule
          </Button>
          <Button size="sm" className="flex-1">
            Join Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

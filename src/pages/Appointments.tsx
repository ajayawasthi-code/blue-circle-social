
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Search, Filter, MapPin, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-07-15",
    time: "10:00 AM",
    duration: "30 mins",
    type: "Check-up",
    status: "upcoming",
    location: "Heart Care Center",
    phone: "(555) 123-4567",
    address: "123 Medical Plaza, Suite 200"
  },
  {
    id: 2,
    doctor: "Dr. Mike Chen",
    specialty: "General Practitioner",
    date: "2024-07-20",
    time: "2:30 PM",
    duration: "45 mins",
    type: "Follow-up",
    status: "upcoming",
    location: "City Medical Center",
    phone: "(555) 987-6543",
    address: "456 Health Street, Floor 3"
  },
  {
    id: 3,
    doctor: "Dr. Emily Davis",
    specialty: "Dermatologist",
    date: "2024-06-28",
    time: "11:15 AM",
    duration: "20 mins",
    type: "Consultation",
    status: "completed",
    location: "Skin Care Clinic",
    phone: "(555) 456-7890",
    address: "789 Wellness Ave, Suite 101"
  }
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    type: "",
    notes: ""
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBookAppointment = () => {
    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      duration: "30 mins",
      status: "upcoming",
      location: "Medical Center",
      phone: "(555) 000-0000",
      address: "Medical Plaza"
    };
    
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      doctor: "",
      specialty: "",
      date: "",
      time: "",
      type: "",
      notes: ""
    });
    setIsBookingOpen(false);
    
    toast({
      title: "Appointment Booked",
      description: "Your appointment has been successfully scheduled.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Manage your medical appointments</p>
          </div>
          
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Book Appointment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="doctor">Doctor</Label>
                  <Input
                    id="doctor"
                    placeholder="Select or search doctor"
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    placeholder="e.g., Cardiology, Dermatology"
                    value={newAppointment.specialty}
                    onChange={(e) => setNewAppointment({...newAppointment, specialty: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Appointment Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Check-up, Follow-up, Consultation"
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  />
                </div>
                <Button onClick={handleBookAppointment} className="w-full">
                  Book Appointment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              size="sm"
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              size="sm"
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="bg-white border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor}</h3>
                        <p className="text-gray-600">{appointment.specialty}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time} ({appointment.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{appointment.address}</p>
                    
                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {appointment.type}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                    {appointment.status === "upcoming" && (
                      <>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">
                          Join Call
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </>
                    )}
                    {appointment.status === "completed" && (
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card className="bg-white border">
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Try adjusting your search" : "You don't have any appointments yet"}
              </p>
              <Button onClick={() => setIsBookingOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Book Your First Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Appointments;

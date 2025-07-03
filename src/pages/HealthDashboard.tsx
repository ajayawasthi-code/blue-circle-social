
import { useState } from "react";
import { Header } from "@/components/Header";
import { HealthMetricsCard } from "@/components/health/HealthMetricsCard";
import { AppointmentCard } from "@/components/health/AppointmentCard";
import { HealthTrendChart } from "@/components/health/HealthTrendChart";
import { QuickActions } from "@/components/health/QuickActions";
import { RecentActivity } from "@/components/health/RecentActivity";

const mockHealthData = {
  vitals: {
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: 98.6,
    weight: 150,
    height: "5'8\"",
    bmi: 22.8
  },
  appointments: [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-07-15",
      time: "10:00 AM",
      type: "Check-up"
    },
    {
      id: 2,
      doctor: "Dr. Mike Chen",
      specialty: "General Practitioner",
      date: "2024-07-20",
      time: "2:30 PM",
      type: "Follow-up"
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: "vital_recorded",
      message: "Blood pressure recorded: 120/80",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "appointment_scheduled",
      message: "Appointment scheduled with Dr. Johnson",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "medication_taken",
      message: "Medication reminder completed",
      timestamp: "2 days ago"
    }
  ]
};

const HealthDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("heartRate");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Dashboard</h1>
          <p className="text-gray-600">Track your health metrics and manage appointments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <HealthMetricsCard
                title="Heart Rate"
                value={`${mockHealthData.vitals.heartRate} bpm`}
                icon="heart"
                trend="+2%"
                trendPositive={true}
                onClick={() => setSelectedMetric("heartRate")}
              />
              <HealthMetricsCard
                title="Blood Pressure"
                value={mockHealthData.vitals.bloodPressure}
                icon="activity"
                trend="Normal"
                trendPositive={true}
                onClick={() => setSelectedMetric("bloodPressure")}
              />
              <HealthMetricsCard
                title="Temperature"
                value={`${mockHealthData.vitals.temperature}°F`}
                icon="thermometer"
                trend="Normal"
                trendPositive={true}
                onClick={() => setSelectedMetric("temperature")}
              />
              <HealthMetricsCard
                title="Weight"
                value={`${mockHealthData.vitals.weight} lbs`}
                icon="monitor"
                trend="-1%"
                trendPositive={false}
                onClick={() => setSelectedMetric("weight")}
              />
              <HealthMetricsCard
                title="BMI"
                value={mockHealthData.vitals.bmi.toString()}
                icon="user"
                trend="Healthy"
                trendPositive={true}
                onClick={() => setSelectedMetric("bmi")}
              />
            </div>

            {/* Health Trend Chart */}
            <HealthTrendChart selectedMetric={selectedMetric} />

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
              <div className="space-y-4">
                {mockHealthData.appointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity activities={mockHealthData.recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;

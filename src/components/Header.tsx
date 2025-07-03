
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Users, LogOut, Heart, Calendar, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/health" className="text-2xl font-bold text-primary">
            HealthConnect
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/health" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/health/appointments" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </Link>
            <Link 
              to="/friends" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search health records, doctors..."
                className="pl-10 rounded-full bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                      alt="Profile" 
                    />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border shadow-lg rounded-xl" align="end">
                <DropdownMenuItem asChild>
                  <Link to="/health/profile" className="cursor-pointer">
                    <div className="flex items-center">
                      <User2 className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium">Health Profile</p>
                        <p className="text-sm text-gray-500">Manage your health info</p>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                          alt="Profile" 
                        />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Social Profile</p>
                        <p className="text-sm text-gray-500">View your social profile</p>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};


import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Edit, Users, MapPin } from "lucide-react";

const mockUserPosts = [
  {
    id: 1,
    user: {
      name: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    content: "Beautiful day for a hike! 🥾",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    likes: 18,
    comments: 5,
    timestamp: "1 day ago",
  },
  {
    id: 2,
    user: {
      name: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    content: "Working on some new projects. Exciting times ahead! 💼",
    likes: 12,
    comments: 3,
    timestamp: "3 days ago",
  },
];

const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");

  const isOwnProfile = !userId || userId === "me";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6 rounded-2xl shadow-sm">
          <CardContent className="p-0">
            {/* Cover Photo */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl relative">
              {isOwnProfile && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-4 right-4 rounded-xl"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Edit Cover
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <div className="p-6 relative">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col md:flex-row md:items-end">
                  {/* Profile Picture */}
                  <div className="relative -mt-16 md:-mt-20 mb-4 md:mb-0 md:mr-6">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                      <AvatarImage 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                        alt="Profile" 
                      />
                      <AvatarFallback className="text-2xl">You</AvatarFallback>
                    </Avatar>
                    {isOwnProfile && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-full"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Name and Info */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {isOwnProfile ? "Your Name" : "John Doe"}
                    </h1>
                    <p className="text-gray-600 mb-2">
                      Software Developer | Photography enthusiast | Coffee lover ☕
                    </p>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        245 friends
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        San Francisco, CA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 md:mt-0">
                  {isOwnProfile ? (
                    <Button className="rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button className="rounded-xl">Add Friend</Button>
                      <Button variant="outline" className="rounded-xl">Message</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Navigation */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "posts"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "about"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("friends")}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "friends"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Friends
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "posts" && (
              <div className="space-y-6">
                {mockUserPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {activeTab === "about" && (
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Bio</h4>
                      <p className="text-gray-600 mt-1">
                        Passionate software developer with a love for creating beautiful and functional applications. 
                        When I'm not coding, you can find me exploring nature with my camera or trying out new coffee shops.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Work</h4>
                      <p className="text-gray-600 mt-1">Software Engineer at TechCorp</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Education</h4>
                      <p className="text-gray-600 mt-1">BS Computer Science - University of California</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Friends</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                        <AvatarImage 
                          src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop&crop=face`} 
                          alt={`Friend ${i}`} 
                        />
                        <AvatarFallback>F{i}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-gray-900">Friend {i}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

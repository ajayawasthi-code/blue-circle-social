
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, UserCheck, UserX } from "lucide-react";

const mockFriends = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b6dc2c6b?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 12,
    status: "online",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 8,
    status: "offline",
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 15,
    status: "online",
  },
];

const mockRequests = [
  {
    id: 1,
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 5,
    timestamp: "2 days ago",
  },
  {
    id: 2,
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 3,
    timestamp: "1 week ago",
  },
];

const mockSuggestions = [
  {
    id: 1,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 7,
    reason: "Works at TechCorp",
  },
  {
    id: 2,
    name: "Jennifer Brown",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    mutualFriends: 4,
    reason: "Studied at UC Berkeley",
  },
];

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState(mockFriends);
  const [requests, setRequests] = useState(mockRequests);
  const [suggestions, setSuggestions] = useState(mockSuggestions);

  const handleAcceptRequest = (id: number) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setFriends([...friends, { ...request, status: "online" }]);
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  const handleDeclineRequest = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleSendRequest = (id: number) => {
    setSuggestions(suggestions.filter(s => s.id !== id));
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Friends</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg">All Friends</TabsTrigger>
            <TabsTrigger value="requests" className="rounded-lg">
              Requests ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="rounded-lg">Suggestions</TabsTrigger>
          </TabsList>

          {/* All Friends */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <Card key={friend.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{friend.name}</p>
                        <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Friend Requests */}
          <TabsContent value="requests">
            <div className="space-y-4">
              {requests.length === 0 ? (
                <Card className="rounded-2xl shadow-sm">
                  <CardContent className="p-8 text-center">
                    <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No friend requests at the moment</p>
                  </CardContent>
                </Card>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="rounded-2xl shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.avatar} alt={request.name} />
                            <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{request.name}</p>
                            <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                            <p className="text-xs text-gray-400">{request.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleAcceptRequest(request.id)}
                            size="sm"
                            className="rounded-xl"
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleDeclineRequest(request.id)}
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Friend Suggestions */}
          <TabsContent value="suggestions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                        <AvatarFallback>{suggestion.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold text-gray-900 mb-1">{suggestion.name}</p>
                      <p className="text-sm text-gray-500 mb-1">{suggestion.mutualFriends} mutual friends</p>
                      <p className="text-xs text-gray-400 mb-4">{suggestion.reason}</p>
                      <Button
                        onClick={() => handleSendRequest(suggestion.id)}
                        size="sm"
                        className="w-full rounded-xl"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Friend
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Friends;

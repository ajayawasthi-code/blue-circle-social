
import { useState } from "react";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { CreatePostModal } from "@/components/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b6dc2c6b?w=100&h=100&fit=crop&crop=face",
    },
    content: "Just had an amazing weekend getaway! The mountains were absolutely breathtaking 🏔️",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    content: "Working on a new project today. Love the creative process! 💻✨",
    likes: 15,
    comments: 3,
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    content: "Beautiful sunset from my balcony tonight 🌅",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    likes: 42,
    comments: 12,
    timestamp: "6 hours ago",
  },
];

const Home = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const handleCreatePost = (content: string, image?: string) => {
    const newPost = {
      id: posts.length + 1,
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      content,
      image,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Create Post Button */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Button
            onClick={() => setIsCreatePostOpen(true)}
            className="w-full rounded-xl py-3 text-left justify-start"
            variant="outline"
          >
            <Plus className="w-5 h-5 mr-2" />
            What's on your mind?
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default Home;

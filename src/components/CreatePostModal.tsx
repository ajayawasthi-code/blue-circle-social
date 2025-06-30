
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, image?: string) => void;
}

export const CreatePostModal = ({ isOpen, onClose, onSubmit }: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = () => {
    // Simulate image selection
    const sampleImages = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setSelectedImage(randomImage);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something to share.",
        variant: "destructive",
      });
      return;
    }

    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      onSubmit(content, selectedImage || undefined);
      setContent("");
      setSelectedImage(null);
      setIsPosting(false);
      onClose();
      toast({
        title: "Post shared!",
        description: "Your post has been shared successfully.",
      });
    }, 1000);
  };

  const handleClose = () => {
    setContent("");
    setSelectedImage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Create Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="You" 
              />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">You</p>
              <p className="text-sm text-gray-500">Public</p>
            </div>
          </div>

          {/* Post Content */}
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] border-0 resize-none text-lg placeholder:text-gray-400 focus:ring-0"
            style={{ boxShadow: 'none' }}
          />

          {/* Selected Image */}
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full rounded-xl object-cover max-h-64"
              />
              <Button
                onClick={handleRemoveImage}
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Add Photo Button */}
          <Button
            onClick={handleImageSelect}
            variant="outline"
            className="w-full rounded-xl py-3 border-2 border-dashed border-gray-300 hover:border-primary"
          >
            <Camera className="w-5 h-5 mr-2" />
            Add Photo
          </Button>

          {/* Post Button */}
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isPosting}
            className="w-full rounded-xl py-3"
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

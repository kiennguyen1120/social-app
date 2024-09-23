import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Camera } from "lucide-react";

export default function ProfileHeader() {
  const [profileImage, setProfileImage] = useState("/placeholder-user.jpg");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profileImage} alt="Profile picture" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-image-upload"
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span className="sr-only">Upload profile picture</span>
            </label>
            <Input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">@johndoe</p>
            <p className="mt-2">
              Web Developer | Coffee Enthusiast | Travel Lover
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4">
              <div>
                <strong className="text-lg">150</strong>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div>
                <strong className="text-lg">5.2K</strong>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div>
                <strong className="text-lg">1.8K</strong>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Web Developer | Coffee Enthusiast | Travel Lover"
                  />
                </div>
                <Button type="submit" onClick={() => setIsEditModalOpen(false)}>
                  Save Changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

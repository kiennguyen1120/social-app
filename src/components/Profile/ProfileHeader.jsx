import React, { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Edit, Camera, UserMinus, UserPlus } from "lucide-react";
import useUserProfileStore from "@/store/userProfileStore";
import useAuthStore from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import useEditProfile from "@/hooks/useEditProfile";
import usePreviewImg from "@/hooks/usePreviewImg";
import useFollowUser from "@/hooks/useFollowUser";
import ProfileUserImg from "../../assets/profile-user.jpg";

export default function ProfileHeader() {
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isUpdatingEdit, editProfile } = useEditProfile();
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isFollowing, isUpdatingFollow, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;
  const fileRef = useRef(null);

  const handleEditProfile = async (event) => {
    event.preventDefault();
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      // onClose();
      setIsEditModalOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };

  const [inputs, setInputs] = useState({
    username: authUser.username || "",
    bio: authUser.bio || "",
  });

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={userProfile.profilePicURL || ProfileUserImg}
                alt="Profile picture"
              />
            </Avatar>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold">{userProfile.username}</h1>
            <p className="mt-2">{userProfile.bio}</p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4">
              <div>
                <strong className="text-lg">{userProfile.posts.length}</strong>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div>
                <strong className="text-lg">
                  {userProfile.followers.length}
                </strong>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div>
                <strong className="text-lg">
                  {userProfile.following.length}
                </strong>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              {visitingOwnProfileAndAuth ? (
                <Button variant="outline" className="ml-auto">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : visitingAnotherProfileAndAuth ? (
                <Button
                  variant="outline"
                  className="ml-auto"
                  onClick={handleFollowUser}
                  disabled={isUpdatingFollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              ) : null}
            </DialogTrigger>
            {visitingOwnProfileAndAuth && (
              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEditProfile}>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <Avatar className="w-32 h-32">
                        <AvatarImage
                          src={
                            userProfile.profilePicURL ||
                            selectedFile ||
                            ProfileUserImg
                          }
                          alt="Profile picture"
                        />
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
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={
                        inputs.username !== ""
                          ? inputs.username
                          : authUser.username
                      }
                      onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={inputs.bio !== "" ? inputs.bio : authUser.bio}
                      onChange={(e) =>
                        setInputs({ ...inputs, bio: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" disabled={isUpdatingEdit}>
                    {isUpdatingEdit ? <span>Loading...</span> : "Save"}
                  </Button>
                </form>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

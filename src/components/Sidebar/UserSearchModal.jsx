import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useSearchUser from "@/hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

function UserSearchModal() {
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  const handleUserClick = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!open) {
      setUser(null); // Reset user state when modal is closed
    }
  }, [open, setUser]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
          <DialogDescription>
            Enter a username to search for a user.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 py-4" onSubmit={handleSearchUser}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter username" ref={searchRef} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <span>Loading...</span> : "Search"}
          </Button>
        </form>
        {user && (
          <SuggestedUser
            user={user}
            setUser={setUser}
            onClick={handleUserClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UserSearchModal;

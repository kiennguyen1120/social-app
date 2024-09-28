import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <UserX
          className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          User Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          We couldn't find the user you're looking for. They may have been
          removed or never existed.🥹
        </p>
        <Button asChild className="w-full">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

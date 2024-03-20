"use client";
import { useUser } from "@clerk/nextjs";

const UserHeader = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return null;
  }
  return (
    <div className="capitalize ">
      Hello {user.firstName}! welcome to chatify
    </div>
  );
};

export default UserHeader;

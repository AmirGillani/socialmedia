import React from "react";
import ProfileCard from "../components/ProfileCard";
import Input from "../components/Input";
import NewsFeed from "../components/NewsFeed";
export default function Profile({toggle}) {
  return (
    <div className="flex flex-col gap-2 items-center h-screen overflow-auto ">
      <ProfileCard toggle={toggle}  />
      <Input />
     <NewsFeed />
    </div>
  );
}

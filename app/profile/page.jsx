"use client";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      if (res.ok) {
        setMyPosts(data);
      }
    };

    fetchUserPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete this prompt?`
    );

    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/deletePrompt/${post._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const filteredPrompts = myPosts.filter((p) => p._id !== post._id);
          setMyPosts(filteredPrompts);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

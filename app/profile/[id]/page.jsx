"use client";

import { useState, useEffect } from "react";

import Profile from "@components/profile";

const UserProfile = (path) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${path.params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Profile
      name={posts[0]?.creator.username}
      desc={`Welcome to ${posts[0]?.creator.username} profile page`}
      data={posts}
    />
  );
};

export default UserProfile;

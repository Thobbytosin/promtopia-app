"use client";
import Feed from "@components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className=" w-full flex justify-center items-center flex-col">
      <h1 className=" head_text text-center">
        Discover & Share <br className=" max-md:hidden" />
        <span className=" orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className=" desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed posts={posts} />
    </section>
  );
};

export default Home;

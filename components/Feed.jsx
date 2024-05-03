"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTag }) => {
  return (
    <div className="mt-16  prompt_layout   ">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTag} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPostsResults, setSearchedPostsResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt/getPrompt");
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterSearch = (searchtext) => {
    const results = posts?.filter(
      (post) =>
        post.creator?.username
          .toLowerCase()
          .includes(searchtext.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchtext.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchtext.toLowerCase())
    );
    return results;
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterSearch(e.target.value);
        setSearchedPostsResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    clearTimeout(searchTimeout);
    setSearchText(tag);

    setSearchTimeout(
      setTimeout(() => {
        const searchTags = filterSearch(tag);
        setSearchedPostsResults(searchTags);
      }, 500)
    );
  };

  return (
    <section className=" feed ">
      <form className=" relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or prompt..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedPostsResults}
          handleTag={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTag={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;

import React from "react";
import BlogCard from "./BlogCard";

const Blog = () => {
  //   useEffect(() => {
  //     fetch("http://localhost:8800/api/services/firstfour")
  //       .then((response) => response.json())
  //       .then((data) => setServices(data));
  //   }, []);

  return (
    <div>
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default Blog;

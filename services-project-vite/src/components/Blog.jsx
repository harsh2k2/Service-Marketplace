import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/blog")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {blogs.map((blog) => (
        // <Link
        //   key={blog.blog_id}
        //   to={`/blog/${encodeURIComponent(blog.blog_name).replace(
        //     /\s+/g,
        //     "-"
        //   )}`}
        // >
        <Link key={blog.blog_id} to={`/blog/${blog.slug}`}>
          <BlogCard blogName={blog.blog_name} blogImage={blog.blog_image} />
        </Link>
      ))}
    </div>
  );
};

export default Blog;

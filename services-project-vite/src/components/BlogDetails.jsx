import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { bname } = useParams();
  const [blog, setBlog] = useState({});

  const { slug } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8800/api/blog/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setBlog(data))
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.blog_name}</h1>
      <p className="text-gray-700">
        <span className="font-bold">Author:</span> {blog.author}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Date Created:</span>{" "}
        {new Date(blog.date_created).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <br />
      <img
        className="w-full h-64 object-cover mb-4"
        src={`../src/assets/images/blog/${blog.blog_image}`}
        alt={blog.blog_name}
      />
      {/* <p className="text-gray-700 text-lg">{blog.full_description}</p> */}
      {/* Using dangerouslySetInnerHTML to display the formatted content */}
      <div
        className="text-gray-700 text-lg"
        dangerouslySetInnerHTML={{ __html: blog.full_description }}
      />
    </div>
  );
};

export default BlogDetails;

import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Import the CSS file

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/blog_all`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const toggleActiveStatus = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/blog/toggle-active/${id}`);
      fetchBlogs(); // Refresh the list after updating the status
    } catch (error) {
      console.error("Failed to toggle blog active status:", error);
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">
          Activate/Deactivate Blogs
        </h3>
      </div>
      <br />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blog Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogs.map((blog) => (
            <tr key={blog.blog_id}>
              <td className="px-6 py-4 whitespace-nowrap">{blog.blog_name}</td>
              <td className="px-6 py-4 whitespace-nowrap description-cell">
                {blog.full_description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => toggleActiveStatus(blog.blog_id)}>
                  {blog.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;

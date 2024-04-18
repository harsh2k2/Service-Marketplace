const BlogCard = ({ blogName, blogImage, blogContent }) => {
  const truncatedContent =
    blogContent.split(" ").slice(0, 10).join(" ") + "...";

  return (
    <div className="blogCard bg-white shadow-md rounded-lg overflow-hidden max-w-sm m-2">
      <img
        className="w-full h-48 object-cover"
        src={`${
          import.meta.env.VITE_APP_BACKEND_URL
        }/assets/blog/thumbnails/${blogImage}`}
        alt={blogName}
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{blogName}</h2>
        {/* <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        ></p> */}
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        ></p>
        <p>Read more</p>
      </div>
    </div>
  );
};

export default BlogCard;

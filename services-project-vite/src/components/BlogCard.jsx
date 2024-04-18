const BlogCard = ({ blogName, blogImage }) => {
  return (
    <div className="blogCard bg-white shadow-md rounded-lg overflow-hidden max-w-sm m-2">
      <img
        className="w-full h-48 object-cover"
        src={`http://localhost:8800/assets/blog/thumbnails/${blogImage}`}
        alt={blogName}
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{blogName}</h2>
        <p className="text-gray-700">{blogName}</p>
      </div>
    </div>
  );
};

export default BlogCard;

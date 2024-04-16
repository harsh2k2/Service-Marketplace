import { useForm } from "react-hook-form";
import { useState } from "react";

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("blog_name", data["Blog Title"]);
    formData.append("full_description", data["Blog Description"]);

    fetch("http://localhost:8800/api/blog", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Blog added successfully.");
          reset(); // Reset form or navigate to another page
        } else {
          console.error("An error occurred while adding the blog.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Enter Blog Details</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div className="w-full">
                <label className="font-medium">Blog Title</label>
                <input
                  type="text"
                  placeholder="Blog Title"
                  {...register("Blog Title", { required: true })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors["Blog Title"] && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div className="w-full">
                <label className="font-medium">Image Upload</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFile}
                  accept="image/png, image/jpeg, image/jpg"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {/* {errors["Image Upload"] && (
                 <span className="text-red-500">This field is required</span>
                )} */}
              </div>
            </div>
            <div>
              <label className="font-medium">Blog Description</label>
              <textarea
                placeholder="Blog Description"
                {...register("Blog Description", { required: true })}
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
              {errors["Blog Description"] && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <input
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default BlogForm;

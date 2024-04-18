import { useForm } from "react-hook-form";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // State to hold the editor data
  const [editorData, setEditorData] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("image", file);
    formData.append("blog_name", data["Blog Title"]);
    formData.append("author", data["Author Name"]);
    // formData.append("full_description", data["Blog Description"]);
    formData.append("full_description", data["full_description"]);

    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/blog`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Blog added successfully.");
          reset(); // Reset form or navigate to another page
          setEditorData("");
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
                <label className="font-medium">Author Name</label>
                <input
                  type="text"
                  placeholder="Author Name"
                  {...register("Author Name", { required: true })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors["Author Name"] && (
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
            {/* <div>
              <label className="font-medium">Blog Description</label>
              <textarea
                placeholder="Blog Description"
                {...register("Blog Description", { required: true })}
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
              {errors["Blog Description"] && (
                <span className="text-red-500">This field is required</span>
              )}
            </div> */}

            <div>
              <label className="font-medium">Blog Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onInit={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data);
                  setValue("full_description", data); // Update the form value
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              {errors["full_description"] && (
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

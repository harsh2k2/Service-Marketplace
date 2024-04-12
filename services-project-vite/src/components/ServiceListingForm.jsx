import { useState } from "react";
import { useForm } from "react-hook-form";
// import axios from "axios";

const ServiceListingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("image", file);

    formData.append("service_name", data["Service Name"]);
    formData.append("description", data["Description"]);
    formData.append("full_description", data["Full Description"]);
    // formData.append("isActive", true);
    // formData.append("date_created", new Date().toISOString().slice(0, 10));

    // Send the FormData instance to the server
    fetch("http://localhost:8800/api/services", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Service added successfully.");
          reset();
        } else {
          console.error("An error occurred while adding the service.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(errors);

  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // const [imageName, setImageName] = useState("");

  // const handleUpload = () => {
  //   const formdata = new FormData();
  //   formdata.append("image", file);
  //   // using fetch
  //   fetch("http://localhost:8800/api/upload", {
  //     method: "POST",
  //     body: formdata,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setImageName(data.imageName); // set the image name to state
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   // // using axios
  //   // axios
  //   // .post("http://localhost:8800/api/upload", formdata)
  //   // .then((res) => console.log(res))
  //   // .catch((err) => console.error(err));
  // };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">
            Enter Service Details
          </h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Service Name</label>
                <input
                  type="text"
                  placeholder="Service Name"
                  {...register("Service Name", { required: true })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors["Service Name"] && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/* <div>
                <label className="font-medium">Image Path</label>
                <input
                  type="text"
                  placeholder="Image Path"
                  {...register("Image Path", { required: true })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div> */}
              <div>
                <label className="font-medium">Image Upload</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFile}
                  accept="image/png, image/jpeg, image/jpg"
                  // {...register("Image Upload", { required: true })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {/* {errors["Image Upload"] && (
                  <span className="text-red-500">This field is required</span>
                )} */}
              </div>
            </div>
            <div>
              <label className="font-medium">Description</label>
              <input
                type="text"
                placeholder="Description"
                {...register("Description", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors["Description"] && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="font-medium">Full Description</label>
              <textarea
                placeholder="Full Description"
                {...register("Full Description", { required: true })}
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
              {errors["Full Description"] && (
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

export default ServiceListingForm;

import { useForm } from "react-hook-form";

const ServiceListingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const serviceData = {
      service_name: data["Service Name"],
      image_path: data["Image Path"],
      description: data["Description"],
      full_description: data["Full Description"],
      isActive: true,
      date_created: new Date().toISOString().slice(0, 10),
    };

    fetch("http://localhost:8800/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Service added successfully.");
        } else {
          console.error("An error occurred while adding the service.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(errors);

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
              </div>
              <div>
                <label className="font-medium">Image Path</label>
                <input
                  type="text"
                  placeholder="Image Path"
                  {...register("Image Path", { required: true })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
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
            </div>
            <div>
              <label className="font-medium">Full Description</label>
              <textarea
                placeholder="Full Description"
                {...register("Full Description", { required: true })}
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
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

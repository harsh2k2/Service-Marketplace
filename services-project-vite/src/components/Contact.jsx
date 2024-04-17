import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Contact = () => {
  const initialValues = { fullname: "", email: "", phone: "", message: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [services, setServices] = useState([]);

  const { serviceName } = useParams();
  const selectedService = serviceName ? serviceName.replace(/-/g, " ") : "";

  console.log("Selected service from URL:", selectedService);

  useEffect(() => {
    fetch("http://localhost:8800/api/services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        // Check if a service was selected from the URL
        if (selectedService) {
          // Update the form values to include the selected service
          setFormValues({
            ...formValues,
            service: selectedService,
          });
        }
      });
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("Selected service:", formValues.service);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(formValues);
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Include the service_name in the formValues before sending
      const dataToSend = {
        ...formValues,
        service_name: formValues.service,
      };
      try {
        await insertContactData(dataToSend);
        setIsSubmit(true);
        // Reset the form values to initial state
        setFormValues(initialValues);
        // Display a SweetAlert message
        Swal.fire({
          title: "Success!",
          text: "Your form has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error submitting your form.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fullname) {
      errors.fullname = "Full name is required";
    } else if (values.fullname.length < 3) {
      errors.fullname = "Full name must be more than 3 characters";
    } else if (values.fullname.length > 20) {
      errors.fullname = "Full name must be less than 20 characters";
    } else if (!/^[a-zA-Z ]+$/.test(values.fullname)) {
      errors.fullname = "Full name must contain only alphabets";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid";
    } else if (values.email.length > 50) {
      errors.email = "Email must be less than 50 characters";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (values.phone.length < 10) {
      errors.phone = "Phone number must be 10 digits";
    } else if (values.phone.length > 10) {
      errors.phone = "Phone number must be 10 digits";
    } else if (isNaN(values.phone)) {
      errors.phone = "Phone number must be a number";
    }

    if (!values.message) {
      errors.message = "Message is required";
    } else if (values.message.length > 1000) {
      errors.message = "Message must be less than 1000 characters";
    } else if (values.message.length < 10) {
      errors.message = "Message must be more than 10 characters";
    }

    return errors;
  };

  const insertContactData = async (data) => {
    console.log("Data being sent:", data);
    try {
      const response = await fetch(`http://localhost:8800/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      console.log("there was a problem with fetch operation ", error);
    }
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          <div className="max-w-lg space-y-3">
            <h3 className="text-indigo-600 font-semibold">Contact</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Let us know how we can help
            </p>
            <p>
              We’re here to help and answer any question you might have, We look
              forward to hearing from you! Please fill out the form, or us the
              contact information bellow .
            </p>
            <div className="googleMap ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6887.698395484936!2d76.871115!3d30.32680699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb67e119c69d1%3A0xf2f73a6367b0cb3!2sXportSoft%20Technologies%20Pvt%20Ltd%20%7C%20Best%20Web%20Design%20%26%20Web%20Development%20Company%20in%20Ambala%20%7C%20Top%20Digital%20Marketing%20Agency%20in%20Ambala!5e0!3m2!1sen!2sin!4v1711947779973!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
          <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <select
                  name="service"
                  value={formValues.service || selectedService || ""} // Ensure this is controlled, default to empty string if no service is selected
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">Select a service</option>
                  {/* Placeholder option */}
                  {services.map((service) => (
                    <option
                      key={service.service_id}
                      value={service.service_name}
                    >
                      {service.service_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium">Full name</label>
                <input
                  type="text"
                  name="fullname"
                  className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                    formErrors.fullname
                      ? "border-red-500"
                      : "focus:border-indigo-600"
                  } shadow-sm rounded-lg`}
                  value={formValues.fullname}
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-600">{formErrors.fullname} </p>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="text"
                  name="email"
                  className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                    formErrors.email
                      ? "border-red-500"
                      : "focus:border-indigo-600"
                  } shadow-sm rounded-lg`}
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-600">{formErrors.email} </p>
              <div>
                <label className="font-medium">Phone number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 1234567890"
                  maxLength="13"
                  className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                    formErrors.phone
                      ? "border-red-500"
                      : "focus:border-indigo-600"
                  } shadow-sm rounded-lg`}
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-600">{formErrors.phone} </p>
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  name="message"
                  maxLength="1200"
                  className={`w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border ${
                    formErrors.message
                      ? "border-red-500"
                      : "focus:border-indigo-600"
                  } shadow-sm rounded-lg`}
                  value={formValues.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <p className="text-red-600">{formErrors.message} </p>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
            {/* {Object.keys(formErrors).length === 0 && isSubmit && (
              <p className="text-green-600">Form submitted successfully</p>
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const { sname } = useParams();
  const [service, setService] = useState({});

  const navigate = useNavigate();

  const handleGetQuote = () => {
    console.log("Navigating to contact with service:", service.service_name);
    // In ServiceDetails.jsx or wherever you're navigating
    navigate(
      `/contact/service/${encodeURIComponent(service.service_name).replace(
        /%20/g,
        "-"
      )}`
    );
  };

  useEffect(() => {
    console.log("Fetching service details for name:", sname);
    fetch(`http://localhost:8800/api/services/${encodeURIComponent(sname)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Service details:", data);
        setService(data);
      });
  }, [sname]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{service.service_name} </h1>
      <p>{service.full_description} </p>
      <br />
      <img
        className="size-40"
        src={"../src/assets/images/service/" + service.image_path}
        alt={service.service_name}
      />

      <button
        onClick={handleGetQuote}
        className="px-4 py-3 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2"
      >
        Get a quote
      </button>
    </div>
  );
};

export default ServiceDetails;

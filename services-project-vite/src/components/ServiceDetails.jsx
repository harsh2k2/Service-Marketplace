import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { sname } = useParams();
  const [service, setService] = useState({});

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
      <button className="px-4 py-3 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
        Get a quote
      </button>
    </div>
  );
};

export default ServiceDetails;

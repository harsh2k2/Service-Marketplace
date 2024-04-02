import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { sname } = useParams();
  const [service, setService] = useState({});

  useEffect(() => {
    console.log("Fetching service details for name:", sname);
    fetch(
      `http://localhost:8800/api/services/${encodeURIComponent(sname).replace(
        /%20/g,
        "-"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Service details:", data);
        setService(data);
      });
  }, [sname]);

  return (
    <div>
      <h1 className="text-center">{service.service_name} </h1>
      <p className="text-center">{service.full_description} </p>
    </div>
  );
};

export default ServiceDetails;

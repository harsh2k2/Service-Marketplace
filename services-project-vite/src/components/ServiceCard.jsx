import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ sname }) => {
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8800/api/services/${encodeURIComponent(sname)}`)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, [sname]);

  // Check if service_name is defined before attempting to replace spaces
  const serviceNameWithHyphens = service.service_name
    ? service.service_name.replace(/\s+/g, "-")
    : "";

  return (
    <Link to={`/services/${serviceNameWithHyphens}`}>
      <div className="serviceCard justify-center content-center m-4 p-4 border border-slate-950 rounded-lg">
        <h1>{service.service_name}</h1>
        <img
          className="size-40"
          src={service.image_path}
          alt={service.service_name}
        />
        <p>{service.description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;

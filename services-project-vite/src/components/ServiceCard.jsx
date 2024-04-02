import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ serviceId }) => {
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8800/api/services/${serviceId}`)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, [serviceId]);

  return (
    <Link to={`/services/${service.service_id}`}>
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

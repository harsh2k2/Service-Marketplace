import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const ServiceCard = ({ sname }) => {
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8800/api/services/${encodeURIComponent(sname)}`)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, [sname]);

  if (!service) {
    return <Shimmer />; // or a loading spinner
  }

  return (
    <Link to={`/services/${service.service_name.replace(/\s+/g, "-")}`}>
      <div className="serviceCard m-4 p-4 border border-slate-950 rounded-lg flex flex-col items-center">
        <h1 className="text-xl font-medium text-center text-orange-900">
          {service.service_name}
        </h1>
        <img
          className="size-40"
          src={
            "http://localhost:8800/assets/service/thumbnails/" +
            service.image_path
          }
          alt={service.service_name}
        />
        <h1 className="text-center">{service.description} </h1>
      </div>
    </Link>
  );
};

export default ServiceCard;

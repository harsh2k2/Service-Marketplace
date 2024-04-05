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
      <div className="serviceCard justify-center content-center m-4 p-4 border border-slate-950 rounded-lg">
        <h1>{service.service_name}</h1>
        <img
          className="size-40"
          // src={
          //   "src/assets/images/service/" + "thumbnails-" + service.image_path
          // }
          src={"src/assets/images/service/" + service.image_path}
          alt={service.service_name}
        />
        <h1>{service.description} </h1>
      </div>
    </Link>
  );
};

export default ServiceCard;

import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

// import Banner from "../assets/images/banner-background.jpg";

const Body = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/services/firstfour`)
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      {/* <img src={Banner} alt="Banner" /> */}
      <img src="./assets/banner-background.jpg" alt="Banner" />

      <h1 className="text-3xl font-bold text-center my-4 text-orange-950">
        Our Services
      </h1>
      <div className="ServiceCards grid grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.service_id} sname={service.service_name} />
        ))}
      </div>
    </div>
  );
};

export default Body;

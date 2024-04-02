// src/components/ServiceDropdown.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ServiceDropdown = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="dropdown-menu absolute z-10">
      <ul className="bg-indigo-300">
        {services.map((service) => (
          <li key={service.service_id}>
            <Link to={`/services/${encodeURIComponent(service.service_name)}`}>
              {service.service_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDropdown;

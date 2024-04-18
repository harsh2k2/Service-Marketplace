import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.css";

const ServiceDropdown = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/services`)
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="dropdown-menu drop-mid absolute z-10">
      <ul className="bg-white text-lg">
        {services.map((service) => (
          <li key={service.service_id}>
            {/* <Link to={`/services/${service.service_name.replace(/\s+/g, "-")}`}>
              {service.service_name}
            </Link> */}

            <NavLink
              to={`/services/${service.service_name.replace(/\s+/g, "-")}`}
              className={(navData) =>
                navData.isActive ? "active-service" : "nav-item-service"
              }
            >
              {service.service_name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDropdown;

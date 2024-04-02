import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8800/api/services/${id}`)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, [id]);

  return (
    <div>
      <h1 className="text-center">{service.service_name} </h1>
      <p className="text-center">{service.full_description} </p>
    </div>
  );
};

export default ServiceDetails;

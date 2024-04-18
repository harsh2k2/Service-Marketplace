import { useEffect, useState } from "react";
import axios from "axios";

const ServiceTable = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/services_all`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const toggleActiveStatus = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/services/toggle-active/${id}`);
      fetchServices(); // Refresh the list after updating the status
    } catch (error) {
      console.error("Failed to toggle service active status:", error);
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">
          Activate/Deactivate Services
        </h3>
      </div>
      <br />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Description
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service.service_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {service.service_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {service.description}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                {service.full_description}
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => toggleActiveStatus(service.service_id)}>
                  {service.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;

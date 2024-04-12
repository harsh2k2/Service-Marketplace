import { useEffect, useState } from "react";

const ContactResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/contact/responses")
      .then((response) => response.json())
      .then((data) => setResponses(data));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <div>
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">
          Contact Form Responses
        </h3>
      </div>
      <br />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {responses.map((response) => (
            <tr key={response.contact_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {response.contact_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {response.contact_email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {response.contact_phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(response.contact_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {response.message}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {response.service_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactResponses;

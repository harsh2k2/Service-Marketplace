import ContactResponses from "./ContactResponses";
import ServiceListingForm from "./ServiceListingForm";
import ServiceTable from "./ServiceTable";

const Admin = () => {
  return (
    <div>
      <ServiceListingForm />
      <ContactResponses />
      <ServiceTable />
    </div>
  );
};

export default Admin;

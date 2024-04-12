import ContactResponses from "./ContactResponses";
import ServiceListingForm from "./ServiceListingForm";
import ServiceTable from "./ServiceTable";

const Admin = () => {
  return (
    <div className="divide-y divide-dashed">
      <div>
        <ServiceListingForm />
      </div>

      <br />

      <div>
        <ContactResponses />
      </div>

      <br />

      <div>
        <ServiceTable />
      </div>
    </div>
  );
};

export default Admin;

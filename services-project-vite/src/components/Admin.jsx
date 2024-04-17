import BlogForm from "./BlogForm";
import BlogTable from "./BlogTable";
import ContactResponses from "./ContactResponses";
import ServiceListingForm from "./ServiceListingForm";
import ServiceTable from "./ServiceTable";

const Admin = () => {
  return (
    <div className="divide-y divide-dashed">
      <div>
        <ContactResponses />
      </div>
      <br />

      <div>
        <ServiceListingForm />
      </div>

      <br />

      <div>
        <ServiceTable />
      </div>

      <div>
        <BlogForm />
      </div>

      <br />

      <div>
        <BlogTable />
      </div>
    </div>
  );
};

export default Admin;

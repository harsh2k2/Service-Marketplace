import ServiceCard from "./ServiceCard";

const Body = () => {
  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <h1 className="text-3xl font-bold text-center my-4">Our Services</h1>
      <div className="ServiceCards grid grid-cols-4 gap-4">
        <ServiceCard sname={"Plumbing Services"} />
        <ServiceCard sname={"Electrical Services"} />
        <ServiceCard sname={"Roofing Services"} />
        <ServiceCard sname={"HVAC Services"} />
      </div>
    </div>
  );
};

export default Body;

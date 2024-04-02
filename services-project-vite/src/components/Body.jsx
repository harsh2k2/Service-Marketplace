import ServiceCard from "./ServiceCard";

const Body = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <ServiceCard sname={"Plumbing Services"} />
      <ServiceCard sname={"Electrical Services"} />
      <ServiceCard sname={"Roofing Services"} />
      <ServiceCard sname={"HVAC Services"} />
    </div>
  );
};

export default Body;

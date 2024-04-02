import ServiceCard from "./ServiceCard";

const Body = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <ServiceCard serviceId={1} />
      <ServiceCard serviceId={2} />
      <ServiceCard serviceId={3} />
      <ServiceCard serviceId={4} />
    </div>
  );
};

export default Body;

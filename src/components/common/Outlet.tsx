import { Outlet as OutletRouter } from "react-router-dom";

const Outlet = () => {
  return (
    <section className="w-full lg:w-10/12 lg:min-h-screen">
      <OutletRouter />
    </section>
  );
};

export default Outlet;

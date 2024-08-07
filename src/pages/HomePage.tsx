import { BreadCrumb } from "../components/common/BreadCrumb";
import Todos from "../components/todos/Todos";

const HomePage = () => {
  return (
    <section className="w-full h-screen bg-gray-400 px-4 pt-2">
      <BreadCrumb />

      <Todos />
    </section>
  );
};

export default HomePage;

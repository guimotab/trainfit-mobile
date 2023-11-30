import Header from "../../components/Header";
import Table from "./Table";

function Workout() {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center bg-gray-900 h-full min-h-screen w-full py-10">
      <Table />
    </div>
    </>
  );
}

export default Workout;

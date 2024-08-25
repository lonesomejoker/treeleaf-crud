import { useSelector } from "react-redux";
import Pagination from "./Pagination";

const ListTable = () => {
  return (
    <div className=" font-poppins py-10 overflow-x-scroll xl:overflow-hidden">
      <h1 className="text-[2rem] font-[600] text-center">User Details</h1>
      <div className="mt-1.5 lg:mt-3">
        <Pagination />
      </div>
    </div>
  );
};

export default ListTable;

import React, { useContext, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, editItem } from "../app/slices/DetailSlice";
import {
  onClickCurrentPage,
  onNavigateNext,
  onNavigatePrev,
} from "../app/slices/PaginationSlice";
import { AppContext } from "../layout/UserLayout";

const Pagination = () => {
  const {list}=useSelector((state)=>state.listslice);
  const { Th,Td } = useContext(AppContext);
  const dispatch = useDispatch();
  const { currentPage, dataPerPage } = useSelector((state) => state.pageslice);

  const totalPage = Math.ceil((list?.length ?? 0) / dataPerPage);
  const pages = [...Array(totalPage + 1).keys()]?.slice(1);

  //this is for no.of items to show in a page
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const visibleDatas = list?.slice(firstIndex, lastIndex);

  const handlePrev = () => {
    if (currentPage !== 1) {
      dispatch(onNavigatePrev());
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPage) {
      dispatch(onNavigateNext());
    }
  };

  const handleCurrentPage = (item) => {
    dispatch(onClickCurrentPage(item));
  };

  // State to manage the item being edited
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedData({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      date: user.date,
      city: user.city,
      district: user.district,
      province: user.province,
      country: user.country,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    if (editingUser) {
      dispatch(editItem({ id: editingUser.id, updatedData: editedData }));
      setEditingUser(null); // Exit edit mode
    }
  };

  return (
    <div>
      <table className="w-full shadow-md shadow-emerald-200">
        <thead className="bg-indigo-200 ">
          <tr>
            <Th>ID</Th>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Phone_Num</Th>
            <Th>D.O.B</Th>
            <Th>Address</Th>
            <Th>Profile</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody className=" space-y-1 bg-gray-100">
          {visibleDatas === 0 ? (
            <h1>No Any Datas..</h1>
          ) : (
            visibleDatas?.map((user, idx) => {
              return (
                <tr
                  key={user.id}
                  className="border-b-2 border-gray-200 font-light py-1"
                >
                  <Td>{user.id}</Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <input
                        type="text"
                        name="full_name"
                        value={editedData.full_name}
                        onChange={handleEditChange}
                        required
                      />
                    ) : (
                      user.full_name
                    )}
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleEditChange}
                        required
                      />
                    ) : (
                      user.email
                    )}
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <input
                        type="number"
                        name="phone_number"
                        value={editedData.phone_number}
                        onChange={handleEditChange}
                        required
                      />
                    ) : (
                      user.phone_number
                    )}
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <input
                        type="date"
                        name="date"
                        value={editedData.date}
                        onChange={handleEditChange}
                        required
                      />
                    ) : (
                      user.date
                    )}
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <input
                        type="text"
                        name="address"
                        value={`${editedData.city}, ${editedData.district}, ${editedData.province}, ${editedData.country}`}
                        onChange={handleEditChange}
                        required
                      />
                    ) : (
                      `${user.city}, ${user.district}, ${user.province}, ${user.country}`
                    )}
                  </Td>
                  <Td>
                    <img src={user.image} alt="pp" className="h-[3rem]" />
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <div className=" flex gap-x-3">
                        <button
                          onClick={handleEditSubmit}
                          className="text-green-500"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="text-red-500 ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className=" flex items-center gap-x-3">
                        <FiEdit
                          color="blue"
                          size={32}
                          onClick={() => handleEditClick(user)}
                          className="flex items-center mr-2"
                        />
                        <FiDelete
                          color="red"
                          size={32}
                          onClick={() => dispatch(removeUser(user.id))}
                          className="flex items-center"
                        />
                      </div>
                    )}
                  </Td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div
        className=" flex gap-x-1 items-center px-3 my-4
       w-fit py-1 mx-auto"
      >
        <h1 className=" font-semibold mr-2" onClick={handlePrev}>
          PREV
        </h1>
        <section className=" space-x-2">
          {pages?.map((item) => (
            <button
              key={item}
              className={`text-center p-[0.8rem] px-[1.3rem] rounded-full font-poppins cursor-pointer ${
                item === currentPage
                  ? " bg-white transition scale-105 duration-500"
                  : "text-black"
              }`}
              onClick={() => handleCurrentPage(item)}
            >
              {item}
            </button>
          ))}
        </section>
        <h1 className=" font-semibold ml-2" onClick={handleNext}>
          NEXT
        </h1>
      </div>
      <footer className=" font-semibold flex">
        <h1>
          PAGE: {currentPage} of {totalPage}
        </h1>
      </footer>
    </div>
  );
};

export default Pagination;


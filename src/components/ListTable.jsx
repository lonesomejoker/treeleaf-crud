import React, { useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, editItem } from "../app/slices/DetailSlice";
import InputField from "./InputField";

const ListTable = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.listslice);

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
    <div className=" font-poppins py-10 overflow-x-scroll xl:overflow-hidden">
      <h1 className="text-[2rem] font-[600] text-center">User Details</h1>
      <div className="mt-1.5 lg:mt-3">
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
          <tbody className="bg-gray-100">
            {list.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No user details available
                </td>
              </tr>
            ) : (
              list.map((user) => (
                <tr
                  key={user.id}
                  className="border-b-2 border-gray-200 font-light py-1"
                >
                  <Td>{user.id}</Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <InputField
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
                      <InputField
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
                      <InputField
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
                      <InputField
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
                      <InputField
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
                      <>
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
                      </>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTable;

function Th({ children }) {
  return (
    <th className="px-1.5 lg:px-3 py-2 text-left font-medium ">{children}</th>
  );
}

function Td({ children }) {
  return <td className="px-1.5 lg:px-3 py-2 ">{children}</td>;
}

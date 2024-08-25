import React, { useState } from "react";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import deskImg from "/assets/desk.jpg";
import InputField from "./components/InputField";
import { useGetAllCountriesQuery } from "./services/ApiFetch";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { listData } from "./app/slices/DetailSlice";
import ListTable from "./components/ListTable";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handling input fields
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    date: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};

    if (form.full_name.length < 5) {
      tempErrors.full_name = "Full Name must be at least 5 characters long.";
    }

    if (form.phone_number.length < 7 || form.phone_number.length > 10) {
      tempErrors.phone_number = "Phone Number must be between 7 and 10 digits.";
    }
    if (form.city.length < 4) {
      tempErrors.city = "City Name must be at least 4 characters long.";
    }
    if (form.district.length < 5) {
      tempErrors.district = "District Name must be at least 5 characters long.";
    }
    if (!form.province) {
      tempErrors.province = "Please select a province.";
    }
    if (!form.country) {
      tempErrors.country = "Please select a country.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handling image files
  const [image, setImage] = useState([]);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const isValid = selectedFiles.every((file) => file.type === "image/png");
    if (!isValid) {
      window.alert("Only PNG format is allowed.");
      return;
    }
    if (image.length + selectedFiles.length > 1) {
      window.alert("You can only upload one image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImage([base64String]);
    };
    reader.readAsDataURL(selectedFiles[0]);
    e.target.value = null;
  };

  const handleDeleteImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = {
        id: new Date().getTime(),
        ...form,
        image: image[0] || null,
      };

      dispatch(listData(newUser));
      alert("Added user to the list");
      setImage([]);
      setForm({
        full_name: "",
        email: "",
        phone_number: "",
        date: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
      });
    }
  };

  // RTK Query hook
  const { data, error, isLoading } = useGetAllCountriesQuery();

  if (isLoading) {
    return <h1 className="text-xl font-[500] text-center">Loading...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-xl font-[500] text-center text-red-500">
        Error fetching countries. Please try again later.
      </h1>
    );
  }

  let countriesList = [];
  data?.forEach((item) => {
    countriesList.push(item.name.common);
  });

  return (
    <>
      <div className="py-5 ">
        <div className="lg:flex justify-between bg-white/30 backdrop-blur-lg rounded-[15px] p-3 shadow-lg drop-shadow-md">
          <div className="xl:w-[39%]">
            <section className="px-3 lg:px-10 py-3 lg:py-12">
              <h2 className="font-semibold text-[23px] pb-2">
                Add user details to the list
              </h2>
              <form className="flex-col flex gap-y-5" onSubmit={handleSubmit}>
                <InputField
                  placeholder="Full Name *"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  error={errors.full_name}
                  required
                />
                <InputField
                  placeholder="Email *"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  placeholder="Phone Number *"
                  type="number"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  error={errors.phone_number}
                  required
                />
                <label htmlFor="dob"> Date of Birth</label>
                <InputField
                  id="dob"
                  placeholder="D.O.B *"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

                <label>Address</label>
                <InputField
                  placeholder="City *"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />
                <InputField
                  placeholder="District *"
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  error={errors.district}
                  required
                />
                <InputField
                  type="select"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  placeholder="Select Province *"
                  options={[1, 2, 3, 4, 5, 6, 7]} // Options for provinces
                  error={errors.province}
                  required
                />
                <InputField
                  type="select"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Select Country *"
                  options={countriesList} // Options for countries
                  error={errors.country}
                  required
                />
                <section className=" flex justify-between gap-x-3">
                  <button 
                    className=" flex-1 drop-shadow-lg bg-green-400 p-3 text-[600] hover:bg-green-500 duration-500 hover:translate-y-2 text-white text-xl font-semibold mt-4 rounded-tl-xl rounded-br-xl"
                    type="submit"
                  >
                    Add User
                  </button>
                  <button onClick={() => navigate("/profile")} className="  drop-shadow-lg bg-indigo-500 p-3 text-[600] hover:bg-blue-400 duration-500 hover:translate-y-2 text-white text-xl font-semibold mt-4 rounded-tr-xl rounded-bl-xl">Profiles</button>
                </section>
              </form>
            </section>
          </div>
          <div className="relative xl:flex-1 px-5 lg:px-12 py-6 lg:py-12 rounded-[15px] drop-shadow-md">
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat rounded-[15px] contrast-75 brightness-50"
              style={{
                backgroundImage: `url(${deskImg})`,
              }}
            />
            <div className=" absolute top-4 left-1.5 ">
              <input
                id="fileInput"
                multiple
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="fileInput"
                className=" bg-emerald-400 text-[0.9rem] lg:text-[1.3rem] rounded-t-xl rounded-bl-xl text-white py-3 px-3.5 animate-bounce font-normal"
                title="Upload Image"
              >
                Upload Profile
              </label>

              <div className="grid grid-cols-2 gap-1.5 my-4">
                {Array.from(image)?.map((item, idx) => {
                  return (
                    <div key={idx} className="relative z-[20]">
                      <img
                        src={item}
                        className="h-36 lg:h-52 w-full rounded-lg "
                      />
                      <button
                        className="absolute top-2 right-2"
                        onClick={() => handleDeleteImage(idx)}
                        title="Remove image"
                      >
                        <RxCross1 className=" text-[2.5rem] bg-white/30 backdrop-blur-lg p-2 rounded-md" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListTable />
    </>
  );
};

export default App;

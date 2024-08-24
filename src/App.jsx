import React, { useState } from "react";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import deskImg from "/assets/desk.jpg";
import InputField from "./components/InputField";
import { useGetAllCountriesQuery } from "./services/ApiFetch";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { listData } from "./app/slices/DetailSlice";
import ListTable from "./components/ListTable";

const App = () => {
  const dispatch = useDispatch();

  //query hook of RTK Query
  const { data, error, isLoading } = useGetAllCountriesQuery();
  const countriesList = [];

  data?.forEach((item) => {
    const openData = item.name.common;
    countriesList.push(openData);
  });
  //console.log("countries:", countriesList);
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
  
  // handling image files
  const [image, setImage] = React.useState([]);
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
  
  //handling input fields
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = {
        id: new Date().getTime(),
        ...form,
        image: image[0] || null,};

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

                <button
                  className=" drop-shadow-lg bg-green-400 p-3 text-[600] hover:bg-green-500 duration-500 hover:translate-y-2 text-white text-xl font-semibold mt-4 rounded-tl-xl rounded-br-xl"
                  type="submit"
                >
                  Add User
                </button>
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
                className=" bg-emerald-400 text-[1.3rem] rounded-t-xl rounded-bl-xl text-white py-3 px-3.5 animate-bounce font-normal"
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
                      <RxCross1
                        className="text-[35px] absolute right-1 top-1 bg-gray-300 bg-opacity-25 backdrop-blur-sm p-1.5 rounded-lg z-[99]"
                        onClick={() => handleDeleteImage(idx)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <h1 className=" absolute right-2 top-2 text-gray-200 text-xl font-[500]">
              Shirish Shrestha
            </h1>

            <div className="relative z-10 h-full hidden lg:block">
              <div className="xl:flex justify-between h-full text-white items-end">
                <div className="content-end text-white">
                  <h3 className="font-semibold text-sm">CONTACT ME</h3>
                  <p className="py-3 font-[600]">9810113806</p>
                  <h1 className="text-[20px] lg:text-[30px] font-bold leading-tight mt-2">
                    Let's talk about
                    <br /> Love to hear from you!
                  </h1>
                </div>
                <div className="space-y-8 text-sm lg:text-[16px] xl:text-[18px] content-end xl:mt-0 mt-10">
                  <section className="flex gap-x-3 hover:translate-x-4 duration-300">
                    <IoLocationSharp className="text-[#6364f2] text-2xl" />
                    <section className="space-y-2">
                      <h2 className="font-bold text-[20px] mb-3">My Address</h2>
                      <h3 className="text-[18px]">Balambu, Kathmandu, Nepal</h3>
                    </section>
                  </section>
                  <section className="flex gap-x-3 hover:translate-x-4 duration-300">
                    <IoMail className="text-[#6364f2] text-2xl" />
                    <section className="text-[20px]">
                      <h2 className="font-bold text-[20px] mb-2">
                        How Can I Help?
                      </h2>
                      <h3>shakestha@gmail.com</h3>
                    </section>
                  </section>
                </div>
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

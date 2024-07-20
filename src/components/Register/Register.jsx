import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import Registerimage from "../../image/boy-is-creating-account_118167-6336.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate("");
  const [api, setApi] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showrePassword, setShowrePassword] = useState(false);

  let validationSchema = yup.object().shape({
    name: yup.string().min(3, "Name min length is 3").max(20, "Name max length is 20").required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number").required("Phone is required"),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password must start with an uppercase letter and be 6-14 characters long").required("Password is required"),
    rePassword: yup.string().oneOf([yup.ref("password")], "Password and rePassword must match").required("RePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  async function handleRegister(values) {
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          setLoading(false);
          navigate('/login');
        }
      })
      .catch((apiResponse) => {
        setLoading(false);
        setApi(apiResponse?.response?.data?.message);
      });
  }

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Register</title>
      </Helmet>
      <div className="bg-[#fff] container flex justify-center items-start mx-auto">
        <div className="md:w-1/2 md:flex justify-between items-center hidden">
          <img className="w-[35rem]" src={Registerimage} alt="" />
        </div>

        <form onSubmit={formik.handleSubmit} className=" w-[90%] md:w-1/2 relative py-5 mt-9 ">
          {api ? <div className="absolute top-[50%] z-[35162776] right-0 p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-extrabold mx-2">x</span>{api} <span className="mx-2 font-extrabold">x</span></div> : null}

          <div className="relative z-0 w-11/12 mx-auto py-6 group">
            <input
              type="text"
              name="name"
              id="name"
              className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=""
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label
              htmlFor="name"
              className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              User Name:
            </label>
            {formik.errors.name && formik.touched.name ? (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                <span className="font-semibold text-start flex justify-start">{formik.errors.name}</span>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-11/12 mx-auto py-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=""
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label
              htmlFor="email"
              className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Email:
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                <span className="font-semibold text-start flex justify-start">{formik.errors.email}</span>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-11/12 mx-auto py-6 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=""
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <label
              htmlFor="phone"
              className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Phone:
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                <span className="font-semibold text-start flex justify-start">{formik.errors.phone}</span>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-11/12 mx-auto py-6 group">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=""
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <span
                className="absolute right-0 bottom-1 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
            </div>
            <label
              htmlFor="password"
              className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Password:
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                <span className="font-semibold text-start flex justify-start">{formik.errors.password}</span>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-11/12 mx-auto py-6 group">
            <div className="relative">
              <input
                type={showrePassword ? "text" : "password"}
                name="rePassword"
                id="rePassword"
                className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=""
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
              />
              <span
                className="absolute right-0 bottom-1 cursor-pointer text-gray-500"
                onClick={() => setShowrePassword(!showrePassword)}
              >
                {showrePassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
            </div>
            <label
              htmlFor="rePassword"
              className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              rePassword:
            </label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                <span className="font-semibold text-start flex justify-start">{formik.errors.rePassword}</span>
              </div>
            ) : null}
          </div>

          {/* <div className="relative z-0 w-11/12 mx-auto py-6 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=""
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
            />
            <label
              htmlFor="rePassword"
              className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
             RePassword:
            </label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                <span className="font-semibold text-start flex justify-start">{formik.errors.rePassword}</span>
              </div>
            ) : null}
          </div> */}

          <div className="flex items-center">
            {loading ? <button className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center my-5 px-4">
              <i className="fas fa-spinner fa-spin mx-3"></i> <span className="font-bold">Please wait</span>
            </button> : <button type="submit" className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center px-3 py-1 my-5">
              Submit
            </button>}
            <div>
              <Link className="text-black text-sm mx-10" to={"/login"}>Sign In <i className="text-[0.7rem] mx-2 fa-solid fa-right-from-bracket"></i></Link>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

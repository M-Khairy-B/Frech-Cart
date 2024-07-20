import React, { useContext} from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import imageLogin from "../../image/2853458.jpg"
export default function Login() {
    let { setUserLogin } = useContext(UserContext)
    let navigate = useNavigate("")
    const [api, setApi] = useState('');
    const [lodeing, setLodeing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(values) {
        setLodeing(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .then((apiResponse) => {
                if (apiResponse?.data?.message === 'success') {
                    localStorage.setItem("userToken", apiResponse?.data?.token)
                    setUserLogin(apiResponse?.data?.token)
                    navigate('/home');
                    setLodeing(false);
                }
            })
            .catch((apiResponse) => {
                setLodeing(false);
                setApi(apiResponse?.response?.data?.message);
            })
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email("email is invalid").required("email is required"),
        password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d{1,4})[a-zA-Z\d]{8,12}$/, "password must start with an uppercase letter and be 6-14 characters long").required("password is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Login</title>
            </Helmet>
            <div className="bg-[#fff] container flex flex-col justify-start items-center  mt-5 w-full mx-auto">
                <div className="container">
                    <div className="container flex justify-between items-center  py-6">
                        <div className="md:w-1/2 md:flex justify-between items-center hidden">
                            <img className="w-10/12" src={imageLogin} alt="" />
                        </div>
                        <form onSubmit={formik.handleSubmit} className=" md:w-1/2 w-full relative px-6 md:py-0 py-9">

                            {api ? <div className="fixed top-[10%] right-0  p-4 my-1 text-sm w-1/3 z-50 mx-auto text-red-800 rounded-lg bg-red-100 :text-red-400" role="alert">
                                <span className="font-extrabold mx-2"></span>{api} <span className="mx-2 font-extrabold">x</span></div> : null}
                            <div className="relative z-0  mx-auto py-7 group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none :text-black :focus:border--500 focus:outline-none focus:ring-0 focus:border--600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus: absolute  text-lg text-gray-500  duration-300 scale-75 top-0 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text--600 peer-focus::text--500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email:
                                </label>
                                {formik.errors.email && formik.touched.email ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 :text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.email}</span>
                                    </div>
                                ) : null}
                            </div>
                            <div className="relative z-0  mx-auto py-7 group">
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


                                <div className="flex w-full items-center">
                                    {lodeing ? <button className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center my-5 py-1">
                                        <span className="font-bold">Plase wait <i className="fas fa-spinner fa-spin mx-3"></i></span>
                                    </button> :
                                        <button type="submit" className="bg-[#1ABC9C] font-normal text-white flex justify-end my-5 py-1">
                                            Login
                                        </button>}
                                </div>
                                <div className="flex justify-between">
                                    <Link to={'/Register'} className="font-semibold text-sm text-black">Create a new account</Link>
                                    <Link to={'/ForgotPasswords'} className="font-semibold text-sm text-black">forgot Passwords </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

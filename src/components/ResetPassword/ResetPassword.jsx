import React, { useContext, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
    let { setUserLogin } = useContext(UserContext); // استخدام الدالة الصحيحة
    let navigate = useNavigate("");
    const [api, setApi] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleResetNewPassword(values) {
        setLoading(true);
        try {
            const apiResponse = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);

            if (apiResponse?.data?.token) {
                localStorage.setItem("userToken", apiResponse?.data?.token);
                setUserLogin(apiResponse?.data?.token);
                navigate('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            setApi(error?.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email("Email is invalid").required("Email is required"),
        newPassword: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "New password must start with an uppercase letter and be 8 characters long").required("New password is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit: handleResetNewPassword,
    });

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Reset Password</title>
            </Helmet>
            <div className="bg-[#fff] container flex flex-col justify-start items-center py-6 mt-5 pt-11 w-full mx-auto">
                <div className="container">
      
                    <div className="container py-1">
                        <form onSubmit={formik.handleSubmit} className="container md:w-2/3 w-full  mx-auto  relative py-1 mt-1">
                            {api && (
                                <div className="absolute top-[50%] right-0 p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                    <span className="font-extrabold mx-2">x</span>{api} <span className="mx-2 font-extrabold">x</span>
                                </div>
                            )}
                            <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email || ""}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email:
                                </label>
                                {formik.errors.email && formik.touched.email ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.email}</span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 group">
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword || ""}
                                />
                                <label
                                    htmlFor="newPassword"
                                    className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    New Password:
                                </label>
                                {formik.errors.newPassword && formik.touched.newPassword ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.newPassword}</span>
                                    </div>
                                ) : null}
                                <div className="flex w-full items-center">
                                    {loading ? (
                                        <button className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center my-5  px-4">
                                            <i className="fas fa-spinner fa-spin mx-3"></i> <span className="font-bold">Please wait</span>
                                        </button>
                                    ) : (
                                        <button type="submit" className="bg-[#1ABC9C] font-normal text-white flex justify-end my-5 ">
                                            Reset Password
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

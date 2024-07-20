import React from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
    let navigate = useNavigate("");
    const [api, setApi] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleResetCode(values) {
        setLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .then((apiResponse) => {
                if (apiResponse?.data?.status === "Success") {
                    setLoading(false);
                    navigate('/resetPassword');
                }
            })
            .catch((apiResponse) => {
                setLoading(false);
                setApi(apiResponse?.response?.data?.message);
            });
    }

    let validationSchema = yup.object().shape({
        resetCode: yup.number().required('Reset Code is required'),
    });

    let formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit: handleResetCode,
    });

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>ResetCode</title>
            </Helmet>
            <div className="bg-[#fff] container flex flex-col justify-start items-center py-6 mt-5 pt-11 w-full mx-auto">
                <div className="container">
{/* 
                    <h2 className="text-[#2C3E50] font-bold text-4xl">ResetCode</h2>
                    <div className="flex justify-center items-center py-5">
                        <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
                        <i className="text-[#2C3E50] fa-solid fa-star"></i>
                        <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
                    </div> */}
                    <div className="container py-1">

                        <form onSubmit={formik.handleSubmit} className="container md:w-2/3 w-full  mx-auto relative py-1 mt-1">

                            {api ? <div className="fixed top-[10%]   p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                <span className="font-extrabold mx-2">x</span>{api} <span className="mx-2 font-extrabold">x</span></div> : null}
                            <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 mt-5 group">
                                <input
                                    type="text"
                                    name="resetCode"
                                    id="resetCode"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.resetCode}
                                />
                                <label
                                    htmlFor="resetCode"
                                    className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    ResetCode:
                                </label>
                                {formik.errors.resetCode && formik.touched.resetCode ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.resetCode}</span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="relative z-0 md:w-1/2 w-11/12 mx-auto group">
                                <div className="flex w-full items-center">
                     
                                    {loading ? <button className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center my-1  px-4">
                                        <span className="font-bold">Plase wait <i className="fas fa-spinner fa-spin mx-3"></i></span>
                                    </button> : <button type="submit" className="bg-[#1ABC9C] py-1 px-6 font-normal text-white flex justify-end my-1 ">
                                        OK
                                    </button>}
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}



























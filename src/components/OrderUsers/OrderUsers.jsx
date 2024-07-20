import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import orderimage from "../../image/girl-login-account-for-car-refueling-11801337-9626310.png";
import axios from 'axios';
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { create } from '../../Context/CartContext';

export default function OrderUsers() {
    const [loading, setLoading] = useState(false);
    let { cartId } = useParams();
    let {deleteItem}  = useContext(create)
    
    let validationSchema = yup.object().shape({
        details: yup.string().min(3, "Details min length is 3").max(20, "Details max length is 20").required("Details are required"),
        city: yup.string().min(3, "City min length is 3").max(20, "City max length is 20").required("City is required"),
        phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number").required("Phone is required"),
    });

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: (values) => {
            createCashOrder(values);
            deleteItem()
        },
    });

    async function createCashOrder(address) {
        setLoading(true);
        try {
            let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    shippingAddress: address
                }, {
                params: {
                    url: window.location.origin
                },
                headers: {
                    token: localStorage.getItem("userToken")
                }});
            let { data } = response;
            deleteItem()
            window.open(data.session.url, '_self');
            deleteItem()
        } 
        catch (err) {
            console.error("Error placing order:", err);
        } 
         finally {
            setLoading(false);
        }
        deleteItem()
    }

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Check Out</title>
            </Helmet>
            <div className='container flex justify-between flex-wrap mx-auto my-12 pt-6'>
                <div className='w-1/2 md:flex hidden'>
                    <img src={orderimage} alt="" />
                </div>
                <form className='md:w-1/2 w-[90%] mx-auto p-3' onSubmit={formik.handleSubmit}>
                    <label className='text-start flex justify-start my-3 text-gray-300 text-[1rem] tracking-[0.3] ms-auto' htmlFor="details">Details:</label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.details}
                        name='details'
                        id='details'
                        className="flex py-3 rounded-md px-2 focus:border-green-500 border-green-500 border outline-none flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]"
                        type="text"
                    />
                    {formik.touched.details && formik.errors.details ? (
                        <div className="text-red-500">{formik.errors.details}</div>
                    ) : null}

                    <label className='text-start flex justify-start my-3 text-gray-300 text-[1rem] tracking-[0.3] ms-auto' htmlFor="phone">Phone:</label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        name='phone'
                        id='phone'
                        className="flex py-2 rounded-md px-2 focus:border-green-500 border-green-500 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]"
                        type="tel"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500">{formik.errors.phone}</div>
                    ) : null}

                    <label className='text-start flex justify-start my-3 text-gray-300 text-[1rem] tracking-[0.3] ms-auto' htmlFor="city">City:</label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        name='city'
                        id='city'
                        className="flex py-2 rounded-md px-2 focus:border-green-500 border-green-500 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]"
                        type="text"
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div className="text-red-500">{formik.errors.city}</div>
                    ) : null}

                    <div className='flex'>
                        {loading ? (
                            <button className="mx-5 bg-green-500 font-normal text-white flex justify-center items-center my-5  px-4" disabled>
                                <i className="fas fa-spinner fa-spin mx-3"></i> <span className="font-bold">Please wait</span>
                            </button>
                        ) : (
                            <button type="submit" className="mx-5 bg-green-500 font-normal text-white flex items-center py-2 px-3 justify-end my-5">
                               Go to Visa <i className="fa-brands text-lg fa-cc-visa mx-3"></i>
                            </button>
                        )}

                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}


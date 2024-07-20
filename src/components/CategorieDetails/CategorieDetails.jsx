import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';     
import { Link } from "react-router-dom";
import image from "../../image/WhatsApp Image 2024-06-09 at 02.47.32_ac6608db.jpg";
import { BarLoader, FadeLoader } from "react-spinners";
import toast from 'react-hot-toast';
import { create } from "../../Context/CartContext";
import Loadimg from '../Loading/Loadimg';
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";

export default function CategorieDetails() {
    let { id } = useParams();
    const [getid, setGetid] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    let { category } = useParams();
    const [Isloading, setIsloading] = useState(true);
    const [relatedProducts, setrelatedProducts] = useState([]);

    function getrelatedproduct(category) {
        setIsloading(true);
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allproducts = data.data;
                let related = allproducts.filter(
                    (product) => product.category.name === category
                );
                setrelatedProducts(related);
                setIsloading(false);
            })
            .catch(() => {
                setIsloading(false);
            });
    }

    function getProduct(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .then(({ data }) => {
                setGetid(data?.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false); 
            });
    }

    let { addCart } = useContext(create);

    async function addProductCart(productId) {
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your cart.';
                    } else {
                        throw new Error("This didn't success.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    const [loadingImages, setLoadingImages] = useState({});

    const handleImageLoad = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    const handleImageError = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    useEffect(() => {
        setLoading(true); 
        getProduct(id);
        getrelatedproduct(category);

    }, [id, category]);

    if (Isloading) {
        return (
            <div className="w-[70%] mx-auto py-80  flex justify-center items-center">
                <BarLoader color="#36d7b7" />
            </div>
        );
    }
    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>category Details</title>
            </Helmet>
            <div className="justify-center flex items-start flex-wrap py-9">
                <div className='lg:w-1/4 md:w-1/2 item py-9 flex-wrap my-9 flex flex-col justify-start'>
                    {loading ? (
                        <div className='flex justify-center py-9 items-center flex-wrap'>
                            <ClipLoader size={50} color={"#123abc"} loadinger={imageLoading.toString()} />
                        </div>
                    ) : (
                        <>
                            <div className=' p-4 lg:w-3/4 flex flex-col justify-center mx-auto my-4 relative'>
                                {imageLoading && (
                                    <div className='absolute inset-0 flex justify-center items-center'>
                                        <Loadimg></Loadimg>
                                    </div>
                                )}
                                <img
                                    className={`object-cover lg:w-full w-1/2  flex flex-col justify-center mx-auto ${imageLoading ? 'hidden' : 'block'}`}
                                    src={getid?.image}
                                    alt={getid?.name}
                                    onLoad={() => setImageLoading(false)}
                                    onError={() => setImageLoading(false)} 
                                />
                            </div>
                            <p className='text-red-600 font-semibold tracking-[0.2rem]'>{getid?.name}</p>
                        </>
                    )}
                </div>
                <div className='lg:w-3/4 md:w-1/2 flex-wrap mx-auto my-9 flex flex-col justify-center'>
                    <div className="w-[90%] mx-auto">
                        {relatedProducts?.length === 0 ? (
                            <img src={image} className="md:w-[50%] w-1/3  mx-auto h-[500px]"></img>
                        ) : (
                            <div className="flex mx-auto justify-center items-center flex-wrap">
                                {relatedProducts.map((product) => (
                                    <div key={product.id} className='lg:w-1/4 sm:w-1/2 overflow-hidden group/item  p-3'>
                                        <div className='product '>
                                            <Link className='z-10' to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                                {loadingImages[product.id] !== false && (
                                                    <div className='flex justify-center items-center h-full bg-slate-100'>
                                                        <FadeLoader size={50} color={"gary"} className='bg-slate-100' />
                                                    </div>
                                                )}
                                                <img
                                                    className={`relative object-contain  w-3/5 mx-auto ${loadingImages[product.id] === false ? 'block' : 'hidden'}`}
                                                    src={product?.imageCover}
                                                    alt={product?.title}
                                                    onLoad={() => handleImageLoad(product.id)}
                                                    onError={() => handleImageError(product.id)}
                                                />
                                                <span className='flex justify-start text-green-600'>{product?.category?.name}</span>
                                                <h3 className='text-start my-2 text-gray-600'>{product?.title?.split(' ')?.slice(0, 2)?.join(' ')}</h3>
                                                <div className='flex justify-between items-center'>
                                                    <span className='text-black font-semibold'>{product?.price} EGP</span>
                                                    <span className='text-black font-semibold'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                                                </div>
                                            </Link>
                                            <button onClick={() => addProductCart(product.id)} className='bg-green-700  md:hidden  flex text-center justify-center items-center p-0 my-5 w-10/12 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                                            <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:flex hidden text-center justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
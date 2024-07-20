


import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import useProducts from "../../Hooks/useProducts";
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import Loadimg from '../Loading/Loadimg';
import { ClipLoader } from 'react-spinners';
import { UserContext } from '../../Context/UserContext';
import { ListContext } from '../../Context/ListContext';

export default function ProductDetails() {
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    
    let { userLogin, setUserLogin } = useContext(UserContext);
    let { addList } = useContext(ListContext);
    let { id, category } = useParams();
    const [getid, setGetid] = useState(null);
    const [onCategory, setOnCategory] = useState([]);
    const [imageLoading, setImageLoading] = useState({});
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [isLoadingCategory, setIsLoadingCategory] = useState(true);

    const handleImageLoad = (id) => {
        setImageLoading(prevState => ({ ...prevState, [id]: false }));
    };

    const handleImageLoading = (id) => {
        setImageLoading(prevState => ({ ...prevState, [id]: true }));
    };

    const handleImageError = (id) => {
        setImageLoading(prevState => ({ ...prevState, [id]: false }));
    };

    let { isError, isLoading } = useProducts();


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
                        throw new Error("This didn't work.");
                    }
                },
                error: () => 'Error: This didn\'t work'
            }
        );
    }

    async function addProductlist(productId) {
        localStorage.getItem('userToken')
        toast.promise(
            addList(productId),
            {
                loading: 'Adding product to your list...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your list.';
                    } else {
                        throw new Error("This didn't work.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }


    useEffect(() => {
        async function getProduct() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                setGetid(data.data);
                setIsLoadingProduct(false);
            } catch (error) {
                setIsLoadingProduct(false);
            }
        }

        async function getCategory() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
                const filteredCategory = data.data.filter((product) => product.category.name === category);
                setOnCategory(filteredCategory);
                setIsLoadingCategory(false);
            } catch (error) {
                setIsLoadingCategory(false);
            }
        }
        
        getProduct();
        getCategory();
        setUserLogin()
    }, [id, category, userLogin]);

    if (isLoading || isLoadingProduct) {
        return (
            <div className='flex justify-center py-40 items-center'>
                <Loadimg />
            </div>
        );
    }

    if (isError) {
        return null;
    }

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Products Details</title>
            </Helmet>
            <div className='w-full p-7'>
                <div className='flex container mx-auto flex-wrap justify-between items-center'>
                    <div className='md:w-1/4 w-full mx-auto'>
                        <Slider className='p-5 container' {...settings}>
                            {getid?.images.map((src, index) => (
                                <div key={index} className='relative'>
                                    {imageLoading[index?.id] && (
                                        <div className='absolute inset-0 h-[30vh] flex justify-center items-center'>
                                            <ClipLoader size={30} color={"#123abc"} />
                                        </div>
                                    )}
                                    <img
                                        className={`w-full my-6 h-[50vh] object-contain mx-auto ${imageLoading[index?.id] ? 'hidden' : 'block'}`}
                                        src={src}
                                        alt={getid?.title}
                                        onLoad={() => handleImageLoad(index)}
                                        // onLoadStart={() => handleImageLoading(index)}
                                        onError={() => handleImageError(index)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className='md:w-3/4 w-full p-3 my-5 md:p-20'>
                        <h1 className='font-bold text-start my-4 text-lg text-gray-800'>{getid?.title}</h1>
                        <p className='font-bold text-start my-4 text-lg text-gray-800'>{getid?.description}</p>
                        <div className='flex justify-between items-center my-7'>
                            <span className='text-black font-semibold'>{getid?.price} EGP</span>
                            <span className='text-black font-semibold'>{getid?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                        </div>
                        <button onClick={() => addProductCart(getid.id)} className='bg-green-700 p-0 w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to Cart</button>
                    </div>
                </div>
                {isLoadingCategory ? (
                    <div className='flex justify-center py-20'>
                        <ClipLoader size={50} color={"#123abc"} />
                    </div>
                ) : (
                    <div className='flex  mx-auto flex-wrap w-[90%]'>
                        {onCategory.map((product) => (
                            <div key={product._id} className='lg:w-1/6 md:w-1/4 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                                <div className='product relative overflow-hidden'>
                                    <span className='md:flex hidden'>
                                        <i onClick={() => addProductCart(product.id)} className='producthover transition-transform opacity-0 group-hover/item:opacity-100 my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-cart-shopping'></i>
                                    </span>
                                    <span className='md:flex hidden'>
                                        <i onClick={() => addProductlist(product.id)} className='producthover-2 transition-transform opacity-0 group-hover/item:opacity-100 my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-heart'></i>
                                    </span>
                                    <span className='md:flex hidden'>
                                        <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                            <i className='producthover-1 my-4 text-[14px] border p-2 mx-auto rounded-full border-white bg-green-500 transition-transform opacity-0 group-hover/item:opacity-100 left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-asterisk px-[0.65rem]'></i>
                                        </Link>
                                    </span>
                                    <span className='flex md:hidden'>
                                        <i onClick={() => addProductCart(product.id)} className='producthover my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[80%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-cart-shopping'></i>
                                    </span>
                                    <span className='flex md:hidden'>
                                        <i onClick={() => addProductlist(product.id)} className='producthover-2 my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[80%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-heart'></i>
                                    </span>
                                    <span className='flex md:hidden'>
                                        <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                            <i className='producthover-1 my-4 text-[14px] border p-2 mx-auto rounded-full border-white bg-green-500 left-[80%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-asterisk px-[0.65rem]'></i>
                                        </Link>
                                    </span>
                                    <Link to={`/productdetails/${product._id}/${product?.category?.name}`}>
                                        <div className='relative'>
                                            {imageLoading[product._id] && (
                                                <div className='absolute inset-0 py-12 bg-orange-500 flex justify-center items-center'>
                                                    <ClipLoader size={30} color={"#123abc"} />
                                                </div>
                                            )}
                                            <img
                                                className={`object-contain w-full ${imageLoading[product._id] ? 'hidden' : 'block'}`}
                                                src={product?.imageCover}
                                                alt={product?.title}
                                                onLoad={() => handleImageLoad(product._id)}
                                                onError={() => handleImageError(product._id)}
                                            />
                                        </div>
                                        <span className='flex justify-start text-green-600'>{product?.category?.name}</span>
                                        <h3 className='text-start my-2 text-gray-600'>{product?.title.split(' ').slice(0, 2).join(' ')}</h3>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-black font-semibold'>{product?.price} EGP</span>
                                            <span className='text-black font-semibold'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                                        </div>
                                    </Link>
                                    <button onClick={() => addProductCart(product._id)} className='bg-green-700 p-0 md:hidden flex justify-center items-center w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to Cart</button>
                                    <button onClick={() => addProductCart(product._id)} className='bg-green-700 p-0 md:flex hidden justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-[1] group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

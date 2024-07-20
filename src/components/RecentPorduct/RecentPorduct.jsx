
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import Loadimg from '../Loading/Loadimg';
import { ListContext } from '../../Context/ListContext';

const ITEMS_PER_PAGE = 12;

export default function RecentProduct() {
    let { addCart } = useContext(create);
    let { addList } = useContext(ListContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingImages, setLoadingImages] = useState({});

    async function addProductCart(productId) {
        localStorage.getItem('userToken')
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your cart.';
                    } else {
                        throw new Error("This didn't succeed.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    async function addProductlist(productId) {
        localStorage.getItem('userToken')
        toast.promise(
            addList(productId),
            {
                loading: 'Adding product to your Wishlist...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your Wishlist.';
                    } else {
                        throw new Error("This didn't succeed.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    async function getApi() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { data, isError, isLoading } = useQuery({
        queryKey: ["productQuery"],
        queryFn: getApi,
        staleTime: 20000,
    });

    const totalPages = Math.ceil(data?.data?.data?.length / ITEMS_PER_PAGE);

    const handleImageLoad = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    const handleImageError = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };
    useEffect(() => {
        const scrollToElement = document.getElementById('scrollTop');
        if (scrollToElement) {
            window.scrollTo({
                top: scrollToElement.offsetTop,
                behavior: 'smooth',
            });
        }
    }, [currentPage]);
    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center'>
                <Loadimg />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex justify-center items-center'>
                <p>Error loading data</p>
            </div>
        );
    }

    const currentProducts = data?.data?.data?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <React.Fragment>
            <div id="scrollTop" className='container mx-auto px-4'>
               
                <div   className='flex justify-center mx-auto items-center my-5 '>
                    {currentPage > 1 && (
                        <span onClick={() => handlePageChange(currentPage - 1)} className='text-gray-500 mx-2 cursor-pointer'>
                            <i className="fa-solid fa-angles-left"></i>
                        </span>
                    )}
                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <span key={pageNumber} onClick={() => handlePageChange(pageNumber + 1)} className={`px-4 py-2 mx-2 rounded cursor-pointer bg-gray-100 ${currentPage === pageNumber + 1 ? 'text-gray-600 font-semibold' : 'text-gray-500'}`}>
                            {pageNumber + 1}
                        </span>
                    ))}
                    {currentPage < totalPages && (
                        <span onClick={() => handlePageChange(currentPage + 1)} className='text-gray-500 mx-2 cursor-pointer'>
                            <i className="fa-solid fa-angles-right"></i>
                        </span>
                    )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {currentProducts.map((product) => (
                        <div key={product.id} className='group/item transition-all overflow-hidden p-4'>
                            <div className='product relative overflow-hidden'>
                                <span className='md:flex hidden'>
                                    <i onClick={() => addProductCart(product.id)} className='producthover transition-transform opacity-0 group-hover/item:opacity-100  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-cart-shopping'></i>
                                </span>
                                <span className='md:flex hidden'>
                                    <i onClick={() => addProductlist(product.id)} className='producthover-2 transition-transform opacity-0 group-hover/item:opacity-100  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-heart'></i>
                                </span>
                                <span className='md:flex hidden'>
                                    <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                        <i className='producthover-1 my-4 text-[14px] border p-2 mx-auto rounded-full border-white bg-green-500 transition-transform opacity-0 group-hover/item:opacity-100  left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-asterisk px-[0.65rem]'></i>
                                    </Link>
                                </span>
                                <span className='flex md:hidden'>
                                    <i onClick={() => addProductCart(product.id)} className='producthover  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[80%]  md:flex hidden text-center justify-center items-center text-white fa-solid fa-cart-shopping'></i>
                                </span>
                                <span className='flex md:hidden'>
                                    <i onClick={() => addProductlist(product.id)} className='producthover-2  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[80%]  md:flex hidden text-center justify-center items-center text-white fa-solid fa-heart'></i>
                                </span>
                                <span className='flex md:hidden'>
                                    <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                        <i className='producthover-1 my-4 text-[14px] border p-2 mx-auto rounded-full border-white bg-green-500  left-[80%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-asterisk px-[0.65rem]'></i>
                                    </Link>
                                </span>
                                <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                                    {loadingImages[product.id] !== false && (
                                        <div className='flex justify-center items-center h-[30vh] bg-gray-200'>
                                            <ClipLoader size={30} color='black' />
                                        </div>
                                    )}
                                    <img
                                        className={`object-contain w-full h-[200px] ${loadingImages[product.id] === false ? 'block' : 'hidden'}`}
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
                                <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:hidden flex justify-center items-center w-10/12 my-5 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                                <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:flex hidden justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mx-auto items-center my-5 '>
                    {currentPage > 1 && (
                        <span onClick={() => handlePageChange(currentPage - 1)} className='text-gray-500 mx-2 cursor-pointer'>
                            <i className="fa-solid fa-angles-left"></i>
                        </span>
                    )}
                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <span key={pageNumber} onClick={() => handlePageChange(pageNumber + 1)} className={`px-4 cursor-pointer py-2 mx-2 rounded bg-gray-100 ${currentPage === pageNumber + 1 ? 'text-gray-600 font-semibold' : 'text-gray-500'}`}>
                            {pageNumber + 1}
                        </span>
                    ))}
                    {currentPage < totalPages && (
                        <span onClick={() => handlePageChange(currentPage + 1)} className='text-gray-500 mx-2 cursor-pointer'>
                            <i className="fa-solid fa-angles-right"></i>
                        </span>
                    )}
                </div>

            </div>
        </React.Fragment>
    );
}
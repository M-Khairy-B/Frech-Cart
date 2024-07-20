import React, { useEffect, useContext, useState } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import wishlistimage from "../../image/no-wishlist-8316267-6632287 (1).png"; 
import { ListContext } from '../../Context/ListContext';
import toast from "react-hot-toast";
import Loadimg from "../Loading/Loadimg";
import { ClipLoader } from 'react-spinners';

export default function Wishlist() {
    let { list, getItemList, setList, removeItemList } = useContext(ListContext);
    const [loadinger, setLoadinger] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    const getcarte = async () => {
        setLoadinger(true);
        try {
            let response = await getItemList();
            setList(response?.data);
        } catch (error) {
            console.error("Error fetching wishlist items:", error.response ? error.response.data : error.message);
            toast.error('Error fetching wishlist items', {
                duration: 1500,
                position: 'bottom-right',
                style: {
                    background: 'rgb(220, 38, 38)',
                    color: 'white',
                },
            });
        } finally {
            setLoadinger(false);
        }
    }

    const handleRemoveFromWishList = async (productId) => {
        try {
            await removeItemList(productId);
            setList(prevList => ({
                ...prevList,
                data: prevList.data.filter(item => item._id !== productId)
            }));
            toast.success('Product removed from wishlist!', {
                duration: 1500,
                position: 'bottom-right',
                style: {
                    background: 'rgb(220, 38, 38)',
                    color: 'white',
                },
            });
        } catch (error) {
            console.error("Error removing product from wishlist", error.response ? error.response.data : error.message);
            toast.error('Error removing product from wishlist', {
                duration: 1500,
                position: 'bottom-right',
                style: {
                    background: 'rgb(220, 38, 38)',
                    color: 'white',
                },
            });
        }
    }

    useEffect(() => {
        getcarte();
    }, []);

    const handleImageLoad = (id) => {
        setImageLoading(prevState => ({ ...prevState, [id]: false }));
    };

    const handleImageLoading = (id) => {
        setImageLoading(prevState => ({ ...prevState, [id]: true }));
    };

    const handleImageError = (id) => {
        setImageLoading(prevState => ({ ...prevState, [id]: false }));
    };

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Wishlist</title>
            </Helmet>

            <div className="container mx-auto px-6 mt-11">
                {loadinger ? (
                    <div className="flex justify-center py-28 items-center h-screen">
                        <Loadimg />
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {Array.isArray(list?.data) && list.data.length > 0 ? (
                            list.data.map((prot) => (
                                <div key={prot._id} className="lg:w-1/5 py-5 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden  shadow  p-3">
                                    <div className="pb-4 relative">
                                        {imageLoading[prot._id] && (
                                            <div className='absolute py-28 inset-0 h-full flex justify-center items-center bg-gray-100 bg-opacity-50'>
                                                <ClipLoader size={30} color={"#123abc"} />
                                            </div>
                                        )}
                                        <img
                                            className={`w-1/2 mx-auto pb-0 mb-0 ${imageLoading[prot._id] ? 'hidden' : 'block'}`}
                                            src={prot.imageCover}
                                            alt=""
                                            onLoad={() => handleImageLoad(prot._id)}
                                            onLoadStart={() => handleImageLoading(prot._id)}
                                            onError={() => handleImageError(prot._id)}
                                        />
                                        <p className="mb-3 font-normal text-gray-700 ">
                                            {prot.title ? prot.title.split(' ')?.slice(0, 2)?.join(' ') : 'No title'}
                                        </p>
                                        <div className='flex justify-evenly items-center mb-3 py-2'>
                                            <span className='text-gray-700 font-semibold'>{prot.price} EGP</span>
                                            <span className='text-gray-700 font-semibold'>{prot.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                                        </div>
                                        <button onClick={() => handleRemoveFromWishList(prot._id)} className="inline-flex items-center px-3 py-1 font-medium text-center text-white bg-red-700 rounded-md outline-none">
                                            Delete
                                            <i className="mx-2 fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex flex-col items-center mx-auto px-6 py-10 justify-center">
                                <img className="w-2/6 mx-auto" src={wishlistimage} alt="No wishlist items" />
                                <p className="mt-4 font-semibold text-gray-700">No items in your wishlist</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

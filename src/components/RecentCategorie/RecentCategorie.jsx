import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loadimg from "../Loading/Loadimg";

export default function RecentCategorie() {
    const [cate, setCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    const handleImageLoad = (categoryId) => {
        setImageLoading((prevState) => ({ ...prevState, [categoryId]: false }));
    };

    const handleImageError = (categoryId) => {
        setImageLoading((prevState) => ({ ...prevState, [categoryId]: false }));
    };

    async function getApi() {
        setLoading(true);
        try {
            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories`
            );
            setCate(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getApi();
    }, []);

    return (
        <React.Fragment>
            <div className="flex flex-wrap mx-auto container py-8">
                {loading ? (
                    <div className="w-full flex justify-center py-9 items-center">
                        <Loadimg />
                    </div>
                ) : (
                    cate?.data?.map((category) => (
                        <div
                            key={category._id}
                            className="lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4"
                        >
                            <div className="product overflow-hidden relative group">
                                <Link
                                    to={`/CategorieDetails/${category._id}/${category?.name}`}
                                >
                                    <div className="relative">
                                        {imageLoading[category._id] && (
                                            <div className="absolute inset-0 flex h-[6vh] justify-center items-center">
                                                <ClipLoader
                                                    size={30}
                                                    color={"#123abc"}
                                                />
                                            </div>
                                        )}
                                        <img
                                            className={`md:h-[250px] h-[250px]  mx-auto rounded-xl ${
                                                imageLoading[category._id]
                                                    ? "hidden"
                                                    : "block"
                                            }`}
                                            src={category?.image}
                                            alt={category?.name}
                                            onLoad={() =>
                                                handleImageLoad(category._id)
                                            }
                                            onError={() =>
                                                handleImageError(category._id)
                                            }
                                        />
                                    </div>
                                    <div className=" bg-[rgba(0,_0,_0,_0.6)] opacity-0 h-100 w-100 absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center rounded-xl group-hover:opacity-100 [transition:.6s_opacity] ">
                                        <h2 className="text-center text-white">
                                            {category?.name}
                                        </h2>
                                    </div>{" "}
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </React.Fragment>
    );
}

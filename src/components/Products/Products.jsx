
import React, { useState, useContext, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import imageFound from '../../image/hand-drawn-no-data-concept_52683-127823.jpg'
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import useProducts from "../../Hooks/useProducts";
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import iconimage from "../../image/avataaars.svg";
import Loadimg from "../Loading/Loadimg";
import { ListContext } from "../../Context/ListContext";

export default function Products() {
  let { addCart } = useContext(create);
  let { addList } = useContext(ListContext);

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
        error: () => `Error: This didn't work`,
      }
    );
  }

  let { data, isError, isLoading } = useProducts();

  async function addProductlist(productId) {
    localStorage.getItem('userToken')
    toast.promise(
      addList(productId),
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleImageLoad = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: false }));
  };

  const handleImageError = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: false }));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 500); // Simulate a delay for searching

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = (data || []).filter(product =>
    product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className='flex justify-center py-36 items-center'>
        <Loadimg />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex justify-center py-36 items-center'>
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Products</title>
      </Helmet>
      <div className='flex flex-wrap items-center mx-auto w-full pt-12'>
        <div className="mx-auto w-full pt-9">
          <input
            className="flex py-3 px-2 focus:border-green-500 border outline-none flex-wrap items-center mx-auto w-11/12 md:w-1/2 placeholder text-[1.1rem] tracking-[0.1rem]"
            type="search"
            placeholder="Search Products"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className='flex flex-wrap mx-auto container py-8'>
        {isSearching ? (
          <div className='flex justify-center items-center w-full'>
            <Loadimg></Loadimg>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className='xl:w-1/6 lg:w-1/5 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
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


                <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                  {loadingImages[product.id] !== false && (
                    <div className='flex justify-center items-center h-[30vh] bg-gray-200'>
                      <ClipLoader size={30} color='black' />
                    </div>
                  )}
                  <img
                    className={`object-contain w-full ${loadingImages[product.id] === false ? 'block' : 'hidden'}`}
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
          ))
        )}
           {filteredProducts.length === 0 && !isSearching && (
        <div className='flex flex-col py-36 justify-center items-center w-full'>
          <img className="w-1/2" src={imageFound} alt="No products found" />
          <p className="font-medium py-4 text-xl text-green-400 text-center">No products found</p>
        </div>
      )}
      </div>
   
    </React.Fragment>
  );
}

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../image/WhatsApp Image 2024-06-09 at 02.47.32_ac6608db.jpg";
import { BarLoader, ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import iconimage from "../../image/avataaars.svg";
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';
function Spbrand() {
  let { id } = useParams();
  const [Brandname, setBrandname] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});

  function getspBrand(id) {
    setIsloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)

      .then((response) => {
        setBrandname(response.data.data.name);
        setIsloading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsloading(false);
      });
  }

  function getrelatedproduct(brandname) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allproducts = data.data;
        let related = allproducts.filter(
          (product) =>
            product.brand.name.toLowerCase() === brandname.toLowerCase()
        );
        setrelatedProducts(related);
      })
      .catch((error) => {
        console.error(error);
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


  useEffect(() => {
    getspBrand(id);
  }, [id]);

  useEffect(() => {
    if (Brandname != null) {
      getrelatedproduct(Brandname);
    }
  }, [Brandname]);

  const handleImageLoad = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: false }));
  };

  const handleImageError = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: false }));
  };

  if (Isloading) {
    return (
      <div className="w-[70%] mx-auto h-screen flex justify-center items-center">
        <BarLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Brands Details</title>
      </Helmet>
      <div className="w-[90%] mx-auto py-6">
        {relatedProducts?.length === 0 ? (
          <img src={image} className="w-[50%] mx-auto h-[500px]" alt="Not Found" />
        ) : (
          <div className="flex flex-wrap  items-center ">
            {relatedProducts?.map((product) => (
              <div key={product.id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                <div className='product overflow-hidden'>
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
            ))}
          </div>
          // </div>
        )}
    </div>
    </React.Fragment >

  );
}

export default Spbrand;

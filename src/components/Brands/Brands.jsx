import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loadimg from "../Loading/Loadimg";
import { Helmet } from "react-helmet-async";
import iconimage from "../../image/avataaars.svg";
import Nofound from "../../image/9264885.jpg";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});

  async function getData() {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleImageLoad = (brandId) => {
    setLoadingImages((prev) => ({ ...prev, [brandId]: false }));
  };

  const handleImageLoading = (brandId) => {
    setLoadingImages((prev) => ({ ...prev, [brandId]: true }));
  };

  if (isLoading) {
    return (
      <div className="w-[70%] mx-auto flex py-36 justify-center items-center">
        <Loadimg />
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="flex justify-center py-36 items-center ">
        <img className="w-[30%]" src={Nofound} alt="Nofound brands" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Brands</title>
      </Helmet>
      <div className="flex justify-center py-16 items-center flex-wrap">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            className="block lg:w-1/5 md:w-1/4 sm:w-1/2 w-1/2"
            to={`/spbrand/${brand._id}`}
          >
            <div
              onClick={() => {
                localStorage.setItem("categoryImage", brand.image);
                localStorage.setItem("categoryName", brand.name);
              }}
              className="w-full p-5 cursor-pointer"
            >
              {loadingImages[brand._id] ? (
                <div className="flex justify-center items-center w-3/4 mx-auto h-full">
                  <ClipLoader size={30} color="black" />
                </div>
              ) : (
                <img
                  src={brand?.image}
                  alt={brand?.name}
                  className="md:w-3/4 w-1/2 mx-auto h-full"
                  onLoad={() => handleImageLoad(brand._id)}
                  onLoadStart={() => handleImageLoading(brand._id)}
                />
              )}
              <h3 className="text-center text-black text-opacity-85 font-semibold mt-3 text-2xl">
                {brand?.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Brands;

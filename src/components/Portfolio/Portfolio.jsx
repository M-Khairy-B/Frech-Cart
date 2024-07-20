import React, { useState } from "react";
import imagebody from "../../image/poert1.png";
import imagebody2 from "../../image/port2.png";
import imagebody3 from "../../image/port3.png";
import { Helmet } from "react-helmet-async";
import iconimage from "../../image/avataaars.svg";

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLayer, setShowLayer] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowLayer(true);
  };

  const handleLayerClick = () => {
    setShowLayer(false);
  };

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Protfolio</title>
      </Helmet>
      <div className="bg-[#fff] container flex flex-col justify-start items-center pt-24 w-full mx-auto">
        <div>

          <h2 className="text-[#2C3E50] font-bold text-5xl">

            PORTFOLIO COMPONENT

          </h2>
          <div className="flex justify-center items-center py-5">
            <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
            <i className="text-[#2C3E50] fa-solid fa-star"></i>
            <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
          </div>
          <div className="container flex flex-wrap">
            <div
              className="lg:w-1/3  md:w-1/2 w-full p-8 "
              onClick={() => handleImageClick(imagebody)}
            >
              <div className="parent group mt-4 relative overflow-hidden">
                <img className="rounded-xl" src={imagebody} alt="" />
                <div className="child flex rounded-xl items-center opacity-0 bg-[#1ABC9C] absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                  <i className="text-white flex justify-center items-center mx-auto  fa-solid fa-plus fa-6x"></i>
                </div>
              </div>
            </div>
            <div
              className=" p-8  lg:w-1/3  md:w-1/2 w-full"
              onClick={() => handleImageClick(imagebody2)}
            >
              <div className="parent group mt-4 relative overflow-hidden">
                <img className="rounded-xl" src={imagebody2} alt="" />
                <div className="child flex rounded-xl items-center opacity-0 bg-[#1ABC9C] absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                  <i className="text-white flex justify-center items-center mx-auto  fa-solid fa-plus fa-6x"></i>
                </div>
              </div>
            </div>
            <div
              className="lg:w-1/3  md:w-1/2 w-full p-8 "
              onClick={() => handleImageClick(imagebody3)}
            >
              <div className="parent group mt-4 relative overflow-hidden">
                <img className="rounded-xl" src={imagebody3} alt="" />
                <div className="child  flex rounded-xl items-center opacity-0 bg-[#1ABC9C] absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                  <i className="text-white flex justify-center items-center mx-auto  fa-solid fa-plus fa-6x"></i>
                </div>
              </div>
            </div>{" "}
            <div
              className="lg:w-1/3  md:w-1/2 w-full p-8 "
              onClick={() => handleImageClick(imagebody)}
            >
              <div className="parent group mt-4 relative overflow-hidden">
                <img className="rounded-xl" src={imagebody} alt="" />
                <div className="child flex rounded-xl items-center opacity-0 bg-[#1ABC9C] absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                  <i className="text-white flex justify-center items-center mx-auto  fa-solid fa-plus fa-6x"></i>
                </div>
              </div>
            </div>
            <div
              className="lg:w-1/3  md:w-1/2 w-full p-8 "
              onClick={() => handleImageClick(imagebody2)}
            >
              <div className="parent group mt-4 relative overflow-hidden">
                <img className="rounded-xl" src={imagebody2} alt="" />
                <div className="child flex rounded-xl items-center opacity-0 bg-[#1ABC9C] absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                  <i className="text-white flex justify-center items-center mx-auto  fa-solid fa-plus fa-6x"></i>
                </div>
              </div>
            </div>
            <div
              className="lg:w-1/3  md:w-1/2 w-full p-8 "
              onClick={() => handleImageClick(imagebody3)}
            >
              <div className="parent group mt-4 relative overflow-hidden">
                <img className="rounded-xl" src={imagebody3} alt="" />
                <div className="child  flex rounded-xl items-center opacity-0 bg-[#1ABC9C] absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                  <i className="text-white flex justify-center items-center mx-auto  fa-solid fa-plus fa-6x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && showLayer && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div onClick={handleLayerClick} className="p-8 rounded-xl">
            <img
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="rounded-xl w-1/2 mx-auto"
              src={selectedImage}
              alt="iamge"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

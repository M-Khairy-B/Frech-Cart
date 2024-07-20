import React from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";

export default function About() {
  return (
    <React.Fragment>
      
      <Helmet>
      <link rel="icon" href={iconimage} />

        <title>About</title>
      </Helmet>
      <div className="bg-[#1ABC9C] h-[90vh] flex justify-center items-center  w-full mx-auto">
        <div className="py-5">
          <h2 className="text-white font-bold text-5xl">ABOUT COMPONENT</h2>
          <div className="flex justify-center items-center py-5">
            <span className="bg-white w-24 h-1 flex justify-center items-center mx-6"></span>
            <i className="text-white fa-solid fa-star"></i>
            <span className="bg-white w-24 h-1 flex justify-center items-center mx-6"></span>
          </div>
          <div className="flex w-2/3 flex-wrap mx-auto">
            <div className=" md:w-1/2 w-full">
              <p className="text-start text-white  p-4">
                Freelancer is a free bootstrap theme created by Route. The
                download includes the complete source files including HTML, CSS,
                and JavaScript as well as optional SASS stylesheets for easy
                customization.
              </p>
            </div>
            <div className=" md:w-1/2 w-full">
              <p className="text-start text-white p-4">
                Freelancer is a free bootstrap theme created by Route. The
                download includes the complete source files including HTML, CSS,
                and JavaScript as well as optional SASS stylesheets for easy
                customization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

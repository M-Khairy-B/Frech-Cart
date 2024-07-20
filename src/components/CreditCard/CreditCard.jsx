import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function CreditCard() {
  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (<React.Fragment>

    <Helmet>
      <link rel="icon" href={iconimage} />
      <title>VISA</title>
    </Helmet>
    <div className="flex flex-wrap items-baseline">
      <div className="lg:w-1/2 w-full flex flex-col justify-between mx-auto lg:h-screen lg:p-2 pt-11">
        <div className="flex  mx-auto w-3/4 justify-center flex-col items-center">
          <div className="flex  flex-col lg:me-auto mx-auto w-3/4 justify-center items-center">
            <div className="flex flex-col  lg:w-3/4 w-full mt-10 items-center">
              <div className="flex items-center">
                <svg className="InlineSVG Icon Header-backArrow mr2 Icon--sm" focusable="false" width={12} height={12} viewBox="0 0 16 16"><path d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z" fillRule="evenodd" /></svg>
                <i className="fa-brands ms-2 text-xl fa-cc-visa"></i>
                <span className="ms-2 font-semibold text-[0.7rem] bg-[#FFDE92] p-1 rounded-md">TEST MODE</span>

              </div>
              <div className="mt-5 w-full flex-col">
                <h2 className="text-xl lg:text-start ms-10 text-gray-400">M.Khairy </h2>
                <p className="text-4xl">EGP 1,794.00</p>
              </div>
            </div>

          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <p>powered by <span>stripe</span> <span> | </span> Terms <span>Privacy</span></p>
        </div>

      </div>
      <div className="lg:w-1/2 px-10 w-full justify-center flex items-center mx-auto p-6 pt-10 my-6 ">
        <div className="w-10/12  lg:me-auto mx-auto">
          <h2 className="text-[20px] text-start my-3 font-semibold">Pay with card</h2>
          <div className=" flex justify-center">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
              className="custom-card "
            />
          </div>

          <form className="lg:me-auto mx-auto container">
            <div className=" py-3 my-4 shadow-sm border rounded-md bg-[#F7F7F7] flex justify-center w-full">
              <span className="me-auto mx-auto">Email</span>
              <span className="mx-auto">all00@gmail.com</span>
            </div>
            <div className="mt-2 flex flex-col lg:justify-start justify-center items-start w-full">
              <label htmlFor="" className="text-start ms-2 flex justify-start my-1 text-gray-400 font-semibold">Card information</label>
              <input
                type="number"
                name="number"
                placeholder="1234 1234 1234 1234"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-full px-1 py-1 lg:me-auto mx-auto border border-gray-300 rounded-r-none rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex lg:justify-start justify-center mx-auto  w-full">
              <div className="w-1/2 flex flex-col lg:justify-start justify-center items-start">
                <input
                  type="number"
                  name="expiry"
                  placeholder="MM / YY"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full px-1 py-1 border border-gray-300 rounded-none rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="number"
                  name="cvc"
                  placeholder=" CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className=" w-full px-1 py-1 border border-gray-300 rounded-r-none rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="my-2 w-full">
              <label htmlFor="" className="text-start ms-auto flex justify-start my-1 text-gray-400 font-semibold">Cardholder name</label>
              <input
                type="text"
                name="name"
                placeholder="Full name on card"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="my-1 w-full">
              <label className='text-start flex justify-start my-1 text-gray-400 text-[1rem] font-semibold tracking-[0.3] ms-auto' htmlFor="city">Country or region</label>
              <select id="city" className="flex py-1 rounded-lg px-1 focus:border-gray-300 border-gray-300 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1rem] font-semibold tracking-wider form-select ">
                <option value disabled>Select a city</option>
                <option value="New York" className="ng-star-inserted">New York</option>
                <option value="Los Angeles" className="ng-star-inserted">Los Angeles</option>
                <option value="Chicago" className="ng-star-inserted">Chicago</option>
                <option value="Houston" className="ng-star-inserted">Houston</option>
                <option value="Egypt" className="ng-star-inserted">Egypt</option>
              </select>
            </div>
            <button className="bg-blue-500 mx-auto w-3/4 flex py-2 text-center justify-center items-center my-5 rounded-md tracking-[0.1rem] text-gray-300 text-[1.1rem]">Pay </button>
          </form>
        </div>
      </div>
    </div>

  </React.Fragment>

  );
}
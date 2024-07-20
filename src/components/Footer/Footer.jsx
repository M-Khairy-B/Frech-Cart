import React from "react";
import visa from '../../assets/images/Visa.png'
import Mastercard from '../../assets/images/Mastercard.png'
import PayPal from '../../assets/images/PayPal-Logo.png'
import Amazon from '../../assets/images/Amazon_Pay.png'
import AppleStore from '../../assets/images/apple store.png'
import GooglePlay from '../../assets/images/google play.png'

export default function Footer() {
  return (
    <React.Fragment>
<footer className='py-5 bg-gray-100'>
  <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
    <h2 className='text-2xl sm:text-4xl font-bold'>Get the Freshcart app</h2>
    <p className='text-gray-400 py-3'>We will send you a link, open it on your phone to download the app</p>
<form action="" className='flex flex-col sm:flex-row items-center'>
  <input type="email" id="email" className="bg-gray-50 border sm:w-auto md:w-full mb-3 sm:mb-0 border-gray-300 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-0 sm:mr-4" placeholder="Email...." required />
  <button className='bg-green-600 rounded-sm sm:w-auto md:w-[30%]  text-white mt-2 sm:mt-0 sm:ml-2'>Share App Link</button>
</form>
    <hr className='my-8'/>
    <div className='flex flex-col sm:flex-row items-center'>
      <div className='flex items-center sm:flex-wrap lg:flex-nowrap mb-4 sm:mb-0'>
        <h4 className='text-xl sm:text-2xl font-bold'>Payment Partner</h4>
        <img className='w-12 sm:w-20 ml-2' src={visa} alt="visa" />
        <img className='w-12 sm:w-20 ml-2' src={Mastercard} alt="Mastercard" />
        <img className='w-12 sm:w-20 ml-2' src={PayPal} alt="PayPal" />
        <img className='w-12 sm:w-20 ml-2' src={Amazon} alt="Amazon" />
      </div>
      <div className='flex items-center'>
        <h4 className='font-medium text-xl sm:text-2xl'>Get deliveries with FreshCart </h4>
        <img className='w-12 sm:w-20 mx-4' src={AppleStore} alt="Apple Store" />
        <img className='w-12 sm:w-20' src={GooglePlay} alt="Google Play" />
      </div>
    </div>
    <hr className='my-8'/>
  </div>
</footer>


    </React.Fragment>
  );
}

import React from 'react';
import mainSlider from '../../assets/images/slider-image-3.jpeg'
import mainSlider1 from '../../assets/images/slider-image-1.jpeg'
import mainSlider2 from '../../assets/images/slider-image-2.jpeg'
import Slider from "react-slick";
export default function MainSilder() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1 ,
        autoplay:true
      };
    return (<React.Fragment>
  <div className='row pt-10'>
    <div className='w-3/4'>
    <Slider {...settings}>
    <img  className='w-full h-[400px]' src={mainSlider} alt="" />
    <img  className='w-full h-[400px]' src={mainSlider1} alt="" />
    <img  className='w-full h-[400px]' src={mainSlider2} alt="" />

    </Slider>
    </div>
    <div></div>
    <div className='w-1/4'>
      <img className=' w-full h-[200px]' src={mainSlider1} alt="" />
      <img className='w-full h-[200px]' src={mainSlider2} alt="" />
    </div>
  </div>
    </React.Fragment>
    )
}

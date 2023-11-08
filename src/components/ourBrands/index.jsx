import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import starbucks from '../../assets/images/startbucks.png';
import amazon from '../../assets/images/amazon.png';
import airarabia from '../../assets/images/airarabia.png';
import suitcase from '../../assets/images/suitcase.png';

const settings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  arrows: false,
  variableWidth: true,
};

const ImageSlide = ({ imageSrc, altText,margin }) => (
  <div className="w-48 h-44 bg-white rounded-xl shadow-md p-2 m-2">
    <img src={imageSrc} alt={altText} className={`w-auto h-auto  ${margin}`} />
  </div>
);

const OurBrands = () => {
  const images = [
    { src: starbucks, alt: 'Starbucks',margin:'my-4 mx-6' },
    { src: amazon, alt: 'Amazon' ,margin:'my-16 mx-6'},
    { src: airarabia, alt: 'Air Arabia', margin:'my-12 mx-6'},
    { src: suitcase, alt: 'Suitcase', margin:'my-4 mx-12'},
  ];

  const generateImageSlides = () => (
    images.map((image, index) => (
      <ImageSlide key={index} imageSrc={image.src} altText={image.alt} margin={image.margin}  />
    ))
  );

  return (
    <div className="w-full overflow-hidden py-6">
      <div className='font-bold text-4xl text-grey py-6'>Businesses that use our platform</div>
      <div className="max-w-screen-xl ">
        <Slider {...settings}>
          {generateImageSlides()}
          {generateImageSlides()} 
        </Slider>
      </div>
    </div>
  );
};

export default OurBrands;

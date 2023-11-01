
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../../assets/images/image.png'

const settings = {
  dots: true,
  infinite: true,
  speed: 500, 
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const contentData = [
  {
    image: image,
    title: 'VejIko',
    role: 'CEO, ILost',
    description:
      '1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam at soluta perspiciatis esse, fugiat odio doloremque iure impedit? Ut nisi id amet, pariatur sapiente eius soluta dignissimos quas odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam amet,',
  },
  {
    image: image,
    title: 'Michael',
    role: 'CEO, ILost',
    description:
      '2Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam at soluta perspiciatis esse, fugiat odio doloremque iure impedit? Ut nisi id amet, pariatur sapiente eius soluta dignissimos quas odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam amet,',
  },
  {
    image: image,
    title: 'Jhonson',
    role: 'CEO, ILost',
    description:
      '3Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam at soluta perspiciatis esse, fugiat odio doloremque iure impedit? Ut nisi id amet, pariatur sapiente eius soluta dignissimos quas odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam amet,',
  },
  {
    image: image,
    title: 'Robert',
    role: 'CEO, ILost',
    description:
      '4Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam at soluta perspiciatis esse, fugiat odio doloremque iure impedit? Ut nisi id amet, pariatur sapiente eius soluta dignissimos quas odio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit aperiam amet,',
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % contentData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {contentData.map((content, index) => (
          <div key={index}>
            <img className="h-screen w-full" src={content.image} alt="" />
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-10 left-16 w-full flex justify-start">
        <ul className="flex">
          {contentData.map((_, index) => (
            <li key={index} className="mx-1">
              <button
                className={`h-2 w-2 rounded-full ${
                  index === activeIndex ? 'bg-light-green' : 'bg-gray-500'
                }`}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute text-white top-1/2 left-16 mt-20 left-12 right-12">
        <h1 className="text-4xl pt-20 font-bold">{contentData[activeIndex].title}</h1>
        <p className="mb-4">{contentData[activeIndex].role}</p>
        <p className="text-sm">{contentData[activeIndex].description}</p>
      </div>
    </div>
  );
};

export default Carousel;

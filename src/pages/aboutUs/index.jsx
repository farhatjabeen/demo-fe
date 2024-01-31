import React from 'react'
import aboutUsImage from '../../assets/images/aboutUs.png'

export default function AboutUs() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold mt-4">
          <p>About us</p>
        </div>
        <div className="text-2xl text-primary-color font-semibold pt-4">
          <p>Welcome to Ilost</p>
        </div>
      </div>

      <div className="relative ">
        <div className="flex ">
          <div>
            <img src={aboutUsImage} alt="aboutUsImage" />
          </div>
          <div className="text-2xl font-medium flex items-end justify-center pb-16 pl-24">
            <p>
              At Ilost, we understand that losing something<br></br>
              valuable can be a stressful and frustrating<br></br>
              experience. That's why we've dedicated ourselves to<br></br>
              creating a platform that helps you reunite with your<br></br>
              lost items quickly and efficiently.
            </p>
          </div>
        </div>

        <div className=" bg-primary-colorback h-40 flex justify-center">
          <div className="absolute top-32 left-96  mt-96 bg-white p-10 w-7/12 rounded-lg">
            <div className="text-2xl font-semibold text-primary-color">
              <p>Our Mission</p>
            </div>
            <div className="text-xl font-medium text-light-black">
              <p>
                Our mission at Ilost is simple: to simplify the process of recovering lost items and
                bring
                <br />
                people together through a shared commitment to helping one another. We believe in
                the
                <br />
                power of technology to connect people and make a positive impact on their lives. By
                <br />
                harnessing the latest advancements, we aim to be the go-to platform for lost and
                found
                <br />
                solutions, fostering a sense of community and compassion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1 className=" mt-32 font-bold text-3xl">
          <p> What Sets Us Apart </p>
        </h1>
        <p className="text-2xl font-medium px-20 pt-6 pb-32 ">
          At Ilost, we take pride in our user-friendly interface and commitment to privacy. We
          understand
          <br></br>the sensitivity of personal belongings, and our platform is designed with your
          security in mind.
          <br></br> We leverage cutting-edge technology to streamline the process of reporting and
          recovering lost
          <br></br> items, ensuring a seamless experience for our users.
        </p>
      </div>
    </div>
  )
}

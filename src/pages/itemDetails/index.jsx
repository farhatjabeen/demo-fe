import React from "react";
import CustomCombinedButton from "../../components/common/button";
import keys from "../../assets/images/keys.png";
const itemDetails = () => {
  return (
    <>
      <div>
        <h1 className="text-black font-bold my-10 text-4xl">
          Item Details(#123412)
        </h1>
      </div>
      <div className="bg-white mt-10 rounded-lg p-4 shadow-md">
        <div className=" flex border-b pb-4 mx-4 justify-between">
          <div>
            <h1 className="text-black font-bold text-xl mt-2">
              Founder Details
            </h1>
          </div>
          <div className=" flex  ">
            <CustomCombinedButton
              text="Export as PDF"
              isReset={false}
              buttonColor="blue"
            />

            <CustomCombinedButton
              text="Contact Founder"
              isReset={true}
              buttonColor="other"
            />
          </div>
        </div>
        <div className="flex p-4 ">
          <div className="w-1/2">
            <div className="mb-2">
              <p className="font-bold mb-2">Founder Name</p>
              <p>GRB Steels</p>
            </div>
            <div className="mb-2">
              <p className="font-bold mb-2">Found Date</p>
              <p> 25-06-23</p>
            </div>
            <div className="mb-2">
              <p className="font-bold mb-2">Found Location </p>
              <p>
                Jhon Smith <br></br>
                ground Floor <br></br>
                Ottawa Canada
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-2">
              <p className="font-bold mb-2">Founder Mobile Number</p>
              <p>2736598760</p>
            </div>
            <div className="mb-2">
              <p className="font-bold mb-2">Found Time</p>
              <p>16.00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-10 p-4 rounded-lg shadow-md">
        <div className="mx-4  border-b pb-4 ">
          <h1 className="text-black font-bold text-xl">Items Details</h1>
        </div>
        <div className="flex p-4 ">
          <div className="w-1/2 mb-2">
            <p className="font-bold mb-2">Item Name</p>
            <p>Three keys with a keychain</p>
          </div>
          <div className="w-1/2 mb-2">
            <p className="font-bold mb-2">Item Category </p>
            <p>Keys</p>
          </div>
        </div>
        <div></div>
        <div className="p-4">
          <p className="font-bold mb-2">Item Description</p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
            repudiandae. Voluptas qui quibusdam quos enim, modi quisquam
            veritatis sapiente fugiat labore maiores voluptatibus sequi impedit
            facere reprehenderit animi odit explicabo! Three keys with a
            keychain Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Iure, repudiandae. Voluptas qui quibusdam quos enim, modi quisquam
            veritatis sapiente fugiat labore maiores voluptatibus sequi impedit
            facere reprehenderit animi odit explicabo! Three keys with a
            keychain
          </p>
        </div>
        <div className="p-4">
          <p className="font-bold mb-2">Images</p>
          <div className="flex">
            <img src={keys} alt="key" />
            <img src={keys} alt="key" className="ml-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default itemDetails;

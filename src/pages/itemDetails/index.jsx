import React ,{useEffect}from "react";
import CustomCombinedButton from "../../components/common/adminButton";
import keys from "../../assets/images/keys.png";
import Breadcrumbs from '../../components/common/breadcrumbs';
import { useParams } from "react-router-dom";
import { foundItemById ,getItemId} from "../../redux/reducers/itemsSlice";
import { useDispatch ,useSelector} from "react-redux";


function ItemDetails () {
  const {id} = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(foundItemById(id))
  }, []);
  const foundItemDetails = useSelector(getItemId);
  const { userName, mobileNumber, foundDate, foundTime, location,itemName,itemCategory,itemDescription } = foundItemDetails||{};
 
  return (
    <div className="m-4">
     <div>
        <Breadcrumbs
          items={[
            { label: 'Found Items', link: '/admin/user/foundItems', className: 'text-black  text-4xl mt-10' },
            { label: 'Item Details (#123456)', className: 'text-black font-bold text-4xl mt-10' },
          ]}
        />
      </div>
      <div className="bg-white mt-10 rounded-lg p-4 shadow-md">
        <div className=" border-b pb-4 mx-4 justify-between">
          <div>
            <h1 className="text-navy-blue font-bold text-xl mt-2">
              Founder Details
            </h1>
          </div>
        </div>
        <div className="flex p-4 ">
          <div className="w-1/2">
            <div className="mb-2">
              <p className="font-bold mb-2">Founder Name</p>
              <p>{userName}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold mb-2">Found Date</p>
              <p>{foundDate}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold mb-2">Found Location </p>
              <p>
              {location}
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-2">
              <p className="font-bold mb-2">Founder Mobile Number</p>
              <p>{mobileNumber}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold mb-2">Found Time</p>
              <p>{foundTime}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-10 p-4 rounded-lg shadow-md">
        <div className="mx-4  border-b pb-4 ">
          <h1 className="text-navy-blue font-bold text-xl">Items Details</h1>
        </div>
        <div className="flex p-4 ">
          <div className="w-1/2 mb-2">
            <p className="font-bold mb-2">Item Name</p>
            <p>{itemName}</p>
          </div>
          <div className="w-1/2 mb-2">
            <p className="font-bold mb-2">Item Category </p>
            <p>{itemCategory}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="font-bold mb-2">Item Description</p>
          <p>
          {itemDescription}
          </p>
        </div>
        <div className="p-4">
          <p className="font-bold mb-2">Images</p>
          <div className="flex">
            {/* <img src={foundItemDetails.itemImage} alt="key" />
            <img src={foundItemDetails.itemImage} alt="key" className="ml-2" /> */}
            <img src={keys} alt="key" />
            <img src={keys} alt="key" className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

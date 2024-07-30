import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare, FaGasPump, FaEuroSign } from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="relative inline-flex">
            <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-500 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-gray-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <Swiper navigation>
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
        <p className="text-2xl font-semibold">
          {listing && listing.name ? `${listing.name} - ` : ""}
          {listing && listing.year ? listing.year : "Year not specified"}
        </p>
        <div className="flex gap-4">
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-3 rounded-md flex items-center justify-center">
            <FaGasPump className="text-lg mr-3" />
            {listing && listing.fuelType ? listing.fuelType : "N/A"}
          </p>
          <p className="bg-emerald-700 w-full max-w-[200px] text-white text-center p-3 rounded-md flex items-center justify-center">
            <FaEuroSign className="text-lg mr-3" />
            {listing && listing.price
              ? listing.price.toLocaleString("en-US")
              : ""}
          </p>
        </div>
        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          {listing && listing.description
            ? listing.description
            : "No description available"}
        </p>
        {currentUser && listing && listing.userRef !== currentUser._id && !contact && (
          <button
            onClick={() => setContact(true)}
            className="relative py-2.5 px-8 text-black text-base font-bold rounded-[50px] overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-zinc-400 before:to-zinc-700 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[50px] hover:before:left-0 "
          >
            Contact Seller
          </button>
        )}
        {contact && <Contact listing={listing}/>}
      </div>
    </main>
  );
}

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import ferrari from "../assets/ferrari.png";
import img from "../assets/img.jpg";
import room from "../assets/room.jpg";
import show from "../assets/show.jpg";
import ListingItems from "../components/ListingItems";

export default function Home() {
  const [allListings, setAllListings] = useState([]);
  console.log(allListings);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const res = await fetch("/api/listing/get?fuelType=gasoline&limit=6");
        const data = await res.json();
        setAllListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllListings();
  }, []);

  SwiperCore.use([Navigation]);
  return (
    <div>
      {/*top*/}
      <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto sm:flex-row">
        <div className="w-full sm:w-1/2">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Find your desired <span className="text-red-500">vehicle</span>
          </h1>
          <div className="text-gray-500 text-xs sm:text-sm">
            <br />
            Discover the epitome of automotive excellence at our showroom, where
            innovation and style unite to redefine your driving experience.
            <br />
          </div>
          <Link
            className="text-xs sm:text-sm text-cyan-500 font-bold hover:underline"
            to={"/search"}
          >
            Let's get started now...
          </Link>
        </div>
        <div className="w-full sm:w-1/2">
          <img
            src={ferrari}
            alt="Ferrari"
            style={{
              maxWidth: "120%",
              height: "auto",
            }}
          />
        </div>
      </div>

      {/*swiper*/}
      <Swiper navigation>
        <SwiperSlide>
          <div
            style={{
              background: `url(${img}) center no-repeat`,
              backgroundSize: "cover",
            }}
            className="h-[550px]"
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              background: `url(${room}) center no-repeat`,
              backgroundSize: "cover",
            }}
            className="h-[550px]"
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              background: `url(${show}) center no-repeat`,
              backgroundSize: "cover",
            }}
            className="h-[550px]"
          ></div>
        </SwiperSlide>
      </Swiper>

      {/*listings*/}
      <div className="max-w-6xl mx-auto p-16  flex flex-col gap-8 my-10 ">
        {allListings && allListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-rose-500">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {allListings.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

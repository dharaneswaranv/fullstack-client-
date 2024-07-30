import { Link } from "react-router-dom";
import { MdLocalGasStation, MdEuro, MdCurrencyRupee } from "react-icons/md";
//import Conctact from "./Contact";

export default function ListingItems({ listing }) {
  return (
    <div className="bg-gray-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 translate-scale duration-300"
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocalGasStation className="h-4 w-4 text-red-700" />
            <p className="text-sm text-slate-600">{listing.fuelType}</p>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex items-center gap-1">
            <MdCurrencyRupee className="h-4 w-4 text-emerald-700" />
            <p className="font-semibold text-slate-700">{listing.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

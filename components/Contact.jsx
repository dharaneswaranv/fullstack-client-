import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Conctact({ listing }) {
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setSeller(data);
      } catch {
        console.log(error);
      }
    };
    fetchSeller();
  }, [listing.userRef]);
  return (
    <>
      {seller && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{seller.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <div className="relative rounded-lg overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:-z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              placeholder="Enter your message here..."
              className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
            ></textarea>
          </div>
          <Link
            to={`mailto:${seller.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="relative py-2.5 px-8 text-black text-center font-bold  rounded-[50px] overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-zinc-300 before:to-zinc-700 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[50px] hover:before:left-0 "
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

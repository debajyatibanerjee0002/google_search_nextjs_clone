import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { XMarkIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import HeaderOptions from "./HeaderOptions";

const Header = ({ searchItem }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchItem);
  const searchInputRef = useRef(router.query.term);

  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;
    if (!term) {
      return;
    }

    router.push(`/search?term=${term}`);
  };

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center">
        <Image
          src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          height={40}
          width={120}
          alt="google logo"
          className="cursor-pointer"
          onClick={() => router.replace("..")}
        />
        <form className="flex flex-grow px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full shadow-lg max-w-3xl items-center">
          <input
            ref={searchInputRef}
            className="flex-grow w-full focus:outline-none"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <XMarkIcon
            className="h-7 text-gray-500 cursor-pointer sm:mr-3 animation duration-100 transform hover:scale-125"
            onClick={() => {
              searchInputRef.current.value = "";
            }}
          />
          <MicrophoneIcon className="h-6 mr-3 hidden sm:inline-flex text-blue-500 border-l-2 pl-4 border-gray-300" />
          <MagnifyingGlassIcon className="h-6 text-blue-500 hidden sm:inline-flex" />
          <button hidden type="submit" onClick={search}>
            Search
          </button>
        </form>
        <Avatar className="ml-auto" url="https://i.ibb.co/qy3wHKL/Logo.jpg" />
      </div>
      <HeaderOptions />
    </header>
  );
};

export default Header;

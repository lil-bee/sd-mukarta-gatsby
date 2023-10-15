import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({
  destination,
  label,
  type,
  fullWidth,
  isActive,
  putihOutline,
}) => {
  return (
    <Link
      to={destination}
      className={` !no-underline
      ${
        isActive
          ? "cursor-default bg-emas-elegan !px-6 !py-4 font-black hover:scale-105"
          : "cursor-pointer bg-emas-elegan "
      }
      
      ${fullWidth ? "block w-full" : "inline-block"}
      ${
        type === "outline"
          ? "text-red border-2 border-emas-elegan bg-transparent !text-emas-elegan "
          : ""
      }
      ${
        putihOutline === "outline_putih"
          ? "!border-white !bg-transparent !text-white"
          : ""
      }
        btn transform rounded-lg px-5 py-3 text-white duration-300 ease-in-out hover:scale-105`}
    >
      {label}
    </Link>
  );
};

import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({
  destination,
  label,
  type,
  fullWidth,
  isActive,
}) => {
  return (
    <Link
      to={destination}
      className={` no-underline
      ${
        isActive
          ? "cursor-default bg-emas-elegan"
          : "cursor-pointer  bg-emas-elegan"
      }
      ${fullWidth ? "block w-full" : "inline-block"}
      ${
        type === "outline"
          ? "border-2 !border-emas-elegan bg-transparent !text-emas-elegan"
          : "!text-white"
      }
        btn transform rounded-lg px-5 py-3 duration-300 ease-in-out hover:scale-105`}
    >
      {label}
    </Link>
  );
};

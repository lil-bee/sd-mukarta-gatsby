import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({
  destination,
  label,
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
        btn`}
    >
      {label}
    </Link>
  );
};

import React, { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export const Cover = ({ children, style, className, gatsbyImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="presentation"
      style={style}
      className={`relative !rounded text-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute h-full w-full overflow-hidden !rounded">
        <GatsbyImage
          alt=""
          image={gatsbyImage}
          className={`h-full w-full transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full !rounded bg-black/50" />
      <div className="z-10 flex w-fit flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

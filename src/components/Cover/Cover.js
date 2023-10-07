import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export const Cover = ({ children, style, className, gatsbyImage }) => {
  return (
    <div style={style} className={`relative text-white ${className} `}>
      <div className="absolute h-full w-full">
        <GatsbyImage
          alt=""
          image={gatsbyImage}
          className="h-full w-full"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
      <div className="z-10 flex flex-col items-center justify-center px-24">
        {children}
      </div>
    </div>
  );
};

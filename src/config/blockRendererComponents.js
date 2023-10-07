import React from "react";
import {
  BlockRenderer,
  getClasses,
  getStyles,
} from "@webdeveducation/wp-block-tools";
import { GatsbyImage } from "gatsby-plugin-image";
import { Cover } from "../components";

export const blockRendererComponents = (block) => {
  console.log(block);
  switch (block.name) {
    case "core/cover": {
      return (
        <Cover
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
          gatsbyImage={block.attributes.gatsbyImage}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </Cover>
      );
    }
    default:
      return null;
  }
};

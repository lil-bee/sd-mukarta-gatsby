import React from "react";
import {
  BlockRenderer,
  getClasses,
  getStyles,
} from "@webdeveducation/wp-block-tools";
import { GatsbyImage } from "gatsby-plugin-image";
import {
  Cover,
  Mediatext,
  CallToActionButton,
  DisplayPostTypes,
  ContactForm7,
} from "../components";

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
    case "contact-form-7/contact-form-selector": {
      return (
        <ContactForm7
          key={block.id}
          formId={block.attributes.id}
          formMarkup={block.attributes.formMarkup
            .replace('novalidate="novalidate"', "")
            .split('aria-required="true"')
            .join('aria-required="true" required')}
        />
      );
    }
    case "dpt/display-post-types": {
      return (
        <DisplayPostTypes
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
          dynamicContent={block.dynamicContent}
        />
      );
    }
    case "core/image": {
      return (
        <figure key={block.id} className={getClasses(block)}>
          <GatsbyImage
            style={getStyles(block)}
            image={block.attributes.gatsbyImage}
            alt={block.attributes.alt || ""}
            width={block.attributes.width}
            height={block.attributes.height}
          />
        </figure>
      );
    }
    case "core/gallery": {
      return (
        <div key={block.id} className={getClasses(block)}>
          <BlockRenderer blocks={block.innerBlocks} />
        </div>
      );
    }
    case "tgg/ctabutton": {
      const alignMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      };
      return (
        <div key={block.id} className={alignMap[block.attributes.data.align]}>
          <CallToActionButton
            destination={block.attributes.data.destination}
            label={block.attributes.data.label}
            type={block.attributes.data.type}
          />
        </div>
      );
    }
    case "core/media-text": {
      return (
        <Mediatext
          key={block.id}
          className={getClasses(block)}
          style={getStyles(block)}
          verticalAlignment={block.attributes.verticalAlignment}
          gatsbyImage={block.attributes.gatsbyImage}
          mediaPosition={block.attributes.mediaPosition}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </Mediatext>
      );
    }

    default:
      return null;
  }
};

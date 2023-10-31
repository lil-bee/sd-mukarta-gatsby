import React from "react";
import {
  BlockRenderer,
  getClasses,
  getStyles,
} from "@webdeveducation/wp-block-tools";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Cover,
  CallToActionButton,
  DisplayPostTypes,
  ContactForm7,
} from "../components";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export const blockRendererComponents = (block) => {
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
        />
      );
    }
    case "core/image": {
      let match = block.originalContent.match(
        /<figcaption class="wp-element-caption">(.*?)<\/figcaption>/
      );
      return (
        <figure
          key={block.id}
          className={`${getClasses(block)} relative h-auto max-w-full`}
        >
          <GatsbyImage
            style={getStyles(block)}
            image={block.attributes.gatsbyImage}
            alt={block.attributes.alt || ""}
            width={block.attributes.width}
            height={block.attributes.height}
          />
          <figcaption
            className={`${getClasses(
              block
            )} absolute bottom-[-10px]  ml-2 !p-0 text-white`}
          >
            {match ? match[1] : ""}
          </figcaption>
        </figure>
      );
    }
    case "core/gallery": {
      return (
        <div key={block.id} className={`columns-2 md:columns-3 lg:columns-3`}>
          <div>
            <BlockRenderer blocks={block.innerBlocks} />
          </div>
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
            putihOutline={block.attributes.className}
          />
        </div>
      );
    }
    case "core/file": {
      return (
        <div className="mt-3 hover:underline">
          <a href={block.attributes.href} download>
            <p className="text-emas-elegan-gelap">
              {block.attributes.href
                .split("/")
                .pop()
                .replace(/\.[^.]+$/, "") + "    "}

              <FontAwesomeIcon icon={faDownload} />
            </p>
          </a>
        </div>
      );
    }

    default:
      return null;
  }
};

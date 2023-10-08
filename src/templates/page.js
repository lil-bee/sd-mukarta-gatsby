import React from "react";
import { BlockRendererProvider } from "@webdeveducation/wp-block-tools";
import { Link } from "gatsby";
import { blockRendererComponents } from "../config/blockRendererComponents";
import { Layout } from "../components/Layout/Layout";

const Page = (props) => {
  return (
    <Layout>
      <BlockRendererProvider
        allBlocks={props.pageContext.blocks}
        siteDomain={process.env.GATSBY_WP_URL}
        customInternalLinkComponent={(
          { children, className, internalHref },
          index
        ) => {
          return (
            <Link key={index} to={internalHref} className={className}>
              {children}
            </Link>
          );
        }}
        renderComponent={blockRendererComponents}
      />
    </Layout>
  );
};

export default Page;

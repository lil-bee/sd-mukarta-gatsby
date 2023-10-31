import React from "react";
import { BlockRendererProvider } from "@webdeveducation/wp-block-tools";
import { Link, graphql } from "gatsby";
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

export const query = graphql`
  query PageQuery($databaseId: Int!) {
    wpPage(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
    wpPrestasi(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
    wpAgenda(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
    wpPost(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
  }
`;

export const Head = ({ data }) => {
  const page = data.wpPage || data.wpPrestasi || data.wpPost || data.wpAgenda;

  return (
    <>
      <title>{page.seo?.title || ""}</title>
      <meta name="description" content={page.seo?.metaDesc || ""}></meta>
    </>
  );
};

export default Page;

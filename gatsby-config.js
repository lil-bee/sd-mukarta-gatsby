require("dotenv").config({
  path: ".env",
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The Gatsby Garage`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: process.env.WPGRAPHQL_URL,
      },
    },
    // "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",

    `gatsby-transformer-sharp`, // Needed for dynamic images,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "id",
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        schema: {
          timeout: 120000,
          perPage: 15,
        },
        verboseOutput: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/mukarta.png",
      },
    },
  ],
};

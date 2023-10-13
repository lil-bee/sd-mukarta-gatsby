const path = require("path");
const {
  assignIds,
  assignGatsbyImage,
} = require("@webdeveducation/wp-block-tools");
const fs = require("fs");

exports.createPages = async ({ actions, graphql }) => {
  const pageTemplate = path.resolve("src/templates/page.js");
  const { createPage } = actions;

  const { data } = await graphql(`
    query AllPagesQuery {
      wp {
        themeStylesheet
      }
      allWpAgenda {
        nodes {
          databaseId
          blocks
          uri
        }
      }
      allWpPrestasi {
        nodes {
          databaseId
          blocks
          uri
        }
      }
      allWpPost {
        nodes {
          databaseId
          blocks
          uri
        }
      }
      allWpPage {
        nodes {
          databaseId
          blocks
          uri
        }
      }
    }
  `);

  try {
    fs.writeFileSync("./public/themeStylesheet.css", data.wp.themeStylesheet);
  } catch (e) {}
  const allPage = [
    ...data.allWpPage.nodes,
    ...data.allWpAgenda.nodes,
    ...data.allWpPost.nodes,
    ...data.allWpPrestasi.nodes,
  ];

  for (let i = 0; i < allPage.length; i++) {
    //ngambil dan ngatur block
    const page = allPage[i];
    let blocks = page.blocks;
    blocks = assignIds(blocks);
    blocks = await assignGatsbyImage({
      blocks,
      graphql,
      coreMediaText: true,
      coreImage: true,
      coreCover: true,
    });
    createPage({
      path: page.uri,
      component: pageTemplate,
      context: {
        blocks,
      },
    });
  }
};

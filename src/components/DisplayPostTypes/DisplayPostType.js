import React from "react";
import { useQuery, gql } from "@apollo/client";
import { PageNumber } from "./PageNumber";
import { Link } from "gatsby";

export const DisplayPostTypes = ({ dynamicContent, style, className }) => {
  let currentPath = "";

  const pageSize = 3;
  let page = 1;

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    currentPath = window.location.pathname;
    page = parseInt(params.get("page") || "1");
  }

  // Menentukan jenis halaman berdasarkan path URL saat ini
  let pageType = "";
  if (currentPath.includes("agenda")) {
    pageType = "agendas";
  } else if (currentPath.includes("prestasi")) {
    pageType = "prestasis";
  } else if (currentPath.includes("berita")) {
    pageType = "posts";
  }

  const { data, loading } = useQuery(
    gql`
      query NewQuery($size: Int!, $offset: Int!) {
        posts(where: { offsetPagination: { size: $size, offset: $offset } }) {
          nodes {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            uri
            title
            date
            databaseId
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
        agendas(where: { offsetPagination: { size: $size, offset: $offset } }) {
          nodes {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            uri
            title
            date
            databaseId
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
        prestasis(
          where: { offsetPagination: { size: $size, offset: $offset } }
        ) {
          nodes {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            uri
            title
            date
            databaseId
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
    {
      variables: {
        size: pageSize,
        offset: pageSize * (page - 1),
      },
    }
  );

  let totalResults = data?.posts?.pageInfo?.offsetPagination?.total || 0;
  // Filter data berdasarkan jenis halaman yang sedang dibuka
  let filteredData = [];
  if (pageType === "agendas") {
    filteredData = data?.agendas?.nodes;
    totalResults = data?.agendas?.pageInfo?.offsetPagination?.total || 0;
  } else if (pageType === "prestasis") {
    filteredData = data?.prestasis?.nodes;
    totalResults = data?.prestasis?.pageInfo?.offsetPagination?.total || 0;
  } else {
    filteredData = data?.posts?.nodes;
    totalResults = data?.posts?.pageInfo?.offsetPagination?.total || 0;
  }

  const totalPages = Math.ceil(totalResults / pageSize);
  return (
    <div className={`w-full ${className}`} style={style}>
      {!loading && !!filteredData?.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {filteredData.map((post) => (
            <Link
              to={post.uri}
              key={post.databaseId}
              class="relative my-5 flex h-80 w-full translate-y-4 transform items-end justify-start overflow-hidden rounded bg-cover bg-center text-left no-underline  shadow-lg duration-500 ease-in-out hover:translate-y-0 md:max-w-2xl"
              style={
                !!post.featuredImage?.node?.sourceUrl
                  ? {
                      backgroundImage: `url(${post.featuredImage.node.sourceUrl})`,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }
                  : {
                      backgroundColor: "#f2f2f2",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }
              }
            >
              {!post.featuredImage?.node?.sourceUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Oops...</span>
                </div>
              )}
              <div class="absolute top-0 right-0 bottom-0 left-0 mt-20 overflow-hidden rounded bg-gradient-to-b from-transparent to-gray-900 shadow-lg"></div>
              <div class="absolute top-0 right-0 left-0 mx-5 mt-2 flex items-center justify-end overflow-hidden bg-transparent ">
                <div class="font-regular  flex flex-col justify-start rounded bg-emas-elegan-gelap p-1 text-right text-gray-100">
                  <span class="leading-0 text-2xl  font-semibold ">
                    {new Date(post.date).getDate()}
                  </span>
                  <span class="-mt-2 font-semibold ">
                    {new Date(post.date)
                      .toLocaleString("default", {
                        month: "long",
                      })
                      .slice(0, 3)}
                  </span>
                  <span class="-mt-1  text-xs">
                    {new Date(post.date).getFullYear()}
                  </span>
                </div>
              </div>
              <main class="z-10 p-5">
                <Link
                  to={post.uri}
                  class="text-xl font-semibold  leading-7 tracking-tight text-white !no-underline transition duration-300 ease-in-out hover:text-emas-elegan-gelap"
                >
                  {post.title.length > 50 ? (
                    <span>{post.title.substring(0, 50)}...</span>
                  ) : (
                    <span>{post.title}</span>
                  )}
                </Link>
              </main>
            </Link>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {!!(totalResults && currentPath !== "/") && (
        <div className="my-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            if (
              i === 0 || // Tombol pertama
              i === totalPages - 1 || // Tombol terakhir
              (i >= page - 2 && i <= page + 2) // Tombol di sekitar halaman saat ini
            ) {
              return <PageNumber key={i} pageNumber={i + 1} />;
            } else if (
              (i === page - 3 && page > 4) || // Tombol sebelum "..."
              (i === page + 3 && page < totalPages - 3) // Tombol setelah "..."
            ) {
              return <span key={i}>...</span>;
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

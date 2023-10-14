import React from "react";
import { useQuery, gql } from "@apollo/client";
import { PageNumber } from "./PageNumber";

export const DisplayPostTypes = ({ dynamicContent, style, className }) => {
  const currentPath = window.location.pathname;

  const pageSize = 6;
  let page = 1;

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    page = parseInt(params.get("page") || "1");
  }

  // Menentukan jenis halaman berdasarkan path URL saat ini
  let pageType = "";
  if (currentPath.includes("agenda")) {
    pageType = "agendas";
  } else if (currentPath.includes("prestasi")) {
    pageType = "prestasis";
  } else {
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

  console.log(filteredData);

  const totalPages = Math.ceil(totalResults / pageSize);
  return (
    <div className={`w-full ${className}`} style={style}>
      {!loading && !!filteredData?.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {filteredData.map((post) => (
            <div
              key={post.databaseId}
              class="relative my-5 flex h-80 w-full translate-y-4 transform items-end justify-start overflow-hidden rounded bg-cover bg-center text-left  shadow-lg duration-500 ease-in-out hover:translate-y-0 md:max-w-2xl"
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
                <div class="font-regular  flex flex-col justify-start rounded bg-emas-elegan p-1 text-right text-gray-100">
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
                <a
                  href={post.uri}
                  class="font-regular text-xl font-medium leading-7 tracking-tight text-white no-underline transition duration-300 ease-in-out hover:text-emas-elegan"
                >
                  {post.title.length > 50 ? (
                    <span>{post.title.substring(0, 50)}...</span>
                  ) : (
                    <span>{post.title}</span>
                  )}
                </a>
              </main>
            </div>

            // {/* <div
            // className="flex flex-col border border-stone-200 bg-stone-100 p-2"
            // key={car.databaseId}
            // >
            // {!!car.featuredImage?.node?.sourceUrl && (
            //   <img
            //     className="h-[200px] w-full object-cover"
            //     src={car.featuredImage.node.sourceUrl}
            //     alt=""
            //   />
            // )}
            // <div className="my-2 justify-between gap-2 font-heading text-xl font-bold lg:flex">
            //   <div className="my-2">{car.title}</div>

            // </div>
            // <div>
            //   <CallToActionButton
            //     label="Lihat Selengkapnya"
            //     destination={car.uri}
            //     type="outline"
            //   />
            // </div>
            // </div> */}
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {!!(totalResults && currentPath !== "/") && (
        <div className="my-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            return <PageNumber key={i} pageNumber={i + 1} />;
          })}
        </div>
      )}
    </div>
  );
};

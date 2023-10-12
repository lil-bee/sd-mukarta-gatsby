import React from "react";
import { useQuery, gql } from "@apollo/client";
import { CallToActionButton } from "../CallToActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
// import { PageNumber } from "./PageNumber";
// import { navigate } from "gatsby";

export const DisplayPostTypes = ({ style, className }) => {
  const { data, loading } = useQuery(
    gql`
      query TestQuery {
        tests {
          nodes {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            uri
            title
          }
        }
      }
    `
  );

  console.log(data);
  console.log(loading);
  console.log(data?.tests?.nodes?.length);

  return (
    <div className={`${className} w-full`} style={style}>
      {!loading && !!data?.tests?.nodes?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.tests.nodes.map((car) => (
            <div
              className="flex flex-col border border-stone-200 bg-stone-100 p-2"
              key={car.databaseId}
            >
              {!!car.featuredImage?.node?.sourceUrl && (
                <img
                  className="h-[200px] w-full object-cover"
                  src={car.featuredImage.node.sourceUrl}
                  alt=""
                />
              )}
              <div className="my-2 justify-between gap-2 font-heading text-xl font-bold lg:flex">
                <div className="my-2">{car.title}</div>
                <div className="text-right">
                  <div className="inline-block whitespace-nowrap bg-emerald-900 p-2 text-white">
                    <FontAwesomeIcon icon={faTag} />£
                    {/* {numeral(car.carDetails.price).format("0,0")} */}
                  </div>
                </div>
              </div>
              <div>
                <CallToActionButton
                  label="Lihat Selengkapnya"
                  destination={car.uri}
                  type="outline"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>gaada</div>
      )}
    </div>
  );
};

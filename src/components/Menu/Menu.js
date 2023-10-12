import { Link, graphql, useStaticQuery, navigate } from "gatsby";
import { CallToActionButton } from "../CallToActionButton";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export const Menu = () => {
  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      wp {
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on WpPage {
                  uri
                }
              }
            }
            menuItems {
              root {
                destination {
                  ... on WpPage {
                    uri
                  }
                }
                label
              }
              subMenuItems {
                destination {
                  ... on WpPage {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    }
  `);

  const handleNavigation = (e, label) => {
    if (label === "Keunggulan") {
      e.preventDefault();
      if (window.location.pathname === "/") {
        scrollToSection(".keunggulan");
      } else {
        navigate("/");
        setTimeout(() => {
          scrollToSection(".keunggulan");
        }, 500); // adjust the delay as needed
      }
    }
  };

  const scrollToSection = (selector) => {
    let target = document.querySelector(selector);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90, // replace navbarHeight with the height of your navbar
        behavior: "smooth",
      });
    }
  };

  const { menuItems } = data.wp.acfOptionsMainMenu.mainMenu;
  console.log(data);
  console.log(window.location.pathname === "/");

  return (
    <div className="sticky top-0 z-20 flex h-20 items-center justify-between bg-biru-gelap  px-10  text-white">
      <Link to="/">
        <StaticImage
          src="../../../static/icon.png"
          height={30}
          layout="fixed"
          alt="logo"
        />
      </Link>
      <div className="flex h-full flex-1 justify-end">
        {(menuItems || []).map((menuItem, index) => (
          <div
            key={index}
            className="group relative flex h-full cursor-pointer"
          >
            <Link
              className=" flex h-full items-center px-4 text-white no-underline hover:bg-blue-900"
              to={menuItem.root.destination?.uri}
            >
              {menuItem.root.label}
            </Link>
            {!!menuItem.subMenuItems?.length && (
              <div className="absolute top-full right-0 hidden bg-biru-gelap text-right group-hover:block">
                {menuItem.subMenuItems.map((subMenuItem, index) => (
                  <Link
                    to={subMenuItem.destination?.uri}
                    key={index}
                    className="block whitespace-nowrap p-4 text-white no-underline hover:bg-blue-900"
                    onClick={(e) => handleNavigation(e, subMenuItem.label)}
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 pl-4">
        {(data.wp.acfOptionsMainMenu.mainMenu.callToActionButton || []).map(
          (ctaButton, index) => (
            <CallToActionButton
              key={index}
              label={ctaButton.label}
              destination={ctaButton.destination.uri}
              type={ctaButton.tipe}
            />
          )
        )}
      </div>
    </div>
  );
};

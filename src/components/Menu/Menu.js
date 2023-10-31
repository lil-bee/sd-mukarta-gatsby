import { Link, graphql, useStaticQuery, navigate } from "gatsby";
import { CallToActionButton } from "../CallToActionButton";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { useState } from "react";

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
              tipe
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (e, label) => {
    if (label === "Keunggulan") {
      e.preventDefault();
      if (window.location.pathname === "/") {
        setIsOpen(!isOpen);
        scrollToSection(".keunggulan");
      } else {
        navigate("/");
        setTimeout(() => {
          scrollToSection(".keunggulan");
        }, 500); // adjust the delay as needed
      }
    } else if (label === "Info Terkini") {
      e.preventDefault();
      if (window.location.pathname === "/") {
        setIsOpen(!isOpen);
        scrollToSection(".berita");
      } else {
        navigate("/");
        setTimeout(() => {
          scrollToSection(".berita");
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

  return (
    <div className="sticky top-0 z-20 flex h-20  items-center justify-between bg-biru-gelap px-3 text-white lg:px-[72px]">
      <Link to="/">
        <StaticImage
          className="rounded-full bg-gray-50"
          src="../../../static/mukarta.png"
          height={60}
          layout="fixed"
          alt="logo"
        />
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="block h-6 w-6 cursor-pointer md:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={toggleMenu}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <div
        id="menu"
        className={`absolute top-20 right-0  ${
          isOpen ? "block" : "hidden"
        } w-full bg-biru-gelap md:relative md:top-0 md:mt-0 md:flex md:h-full md:w-auto md:items-center`}
      >
        <div className="flex h-full w-full flex-1 flex-col items-center justify-end gap-1 md:flex-row">
          {(menuItems || []).map((menuItem, index) => (
            <div
              key={index}
              className="group relative flex h-full cursor-pointer"
            >
              <Link
                className="flex h-full items-center px-4 !font-medium text-white no-underline hover:bg-blue-900"
                to={menuItem.root.destination?.uri}
                onClick={(e) => handleNavigation(e, menuItem.root.label)}
              >
                {menuItem.root.label}
              </Link>
              {!!menuItem.subMenuItems?.length && (
                <div className="absolute top-full right-0 hidden bg-blue-900 text-right md:hidden md:group-hover:block">
                  {menuItem.subMenuItems.map((subMenuItem, index) => (
                    <Link
                      to={subMenuItem.destination?.uri}
                      key={index}
                      className="block whitespace-nowrap p-4 !font-normal text-white no-underline hover:bg-biru-gelap"
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
        <div className="mx-24 mb-4 flex flex-col justify-center gap-3 pt-4 md:m-0 md:flex-row md:pl-4 md:pt-0">
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
    </div>
  );
};

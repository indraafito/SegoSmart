import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#D9D9D9] p-4 flex justify-around">
      {[
        { name: "Home", icon: "fa-home", link: "/Beranda" },
        {
          name: "Menu",
          icon: "fa-solid fa-utensils",
          link: "/cari",
        },
        { name: "Keranjang", icon: "fa-shopping-cart", link: "/Keranjang" },
        { name: "Profil", icon: "fa-user", link: "/Profil" },
      ].map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="flex flex-col items-center group"
        >
          <i
            className={`fas ${
              item.icon
            } text-[#A9A9A9] group-hover:text-[#A79277] ${
              item.name === "Home" ? "shadow-lg" : ""
            } group-hover:shadow-none`}
          ></i>
          <span className="text-xs text-[#A9A9A9] group-hover:text-[#A79277]">
            {item.name}
          </span>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;

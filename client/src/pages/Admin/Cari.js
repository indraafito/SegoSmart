import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import LoginValidation from "./components/LoginValidation";
import axios from "axios";

// FoodItem Component (Optimized with React.memo)
const FoodItem = React.memo(
  ({ imgSrc, title, price, stok, id, addKeranjang }) => {
    return (
      <motion.div
        className="bg-[rgba(167,146,119,0.2)] p-4 rounded-lg relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-24 sm:h-28 md:h-40 object-cover rounded-lg mb-2"
        />
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <p className="text-sm">{price}</p>
        <div className="absolute top-2 right-2 bg-[#A79277] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
          {stok}
        </div>
        <button
          className="absolute bottom-2 right-2 bg-[#A79277] text-white p-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform hover:bg-[#c3a37a] active:scale-95 active:bg-[#d4b48b] active:shadow-lg"
          onClick={() => addKeranjang(id)}
        >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </motion.div>
    );
  }
);

const App = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchParams] = useSearchParams();
  const nama = searchParams.get("nama");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [menu, setMenu] = useState([]);
  const [originalMenu, setOriginalMenu] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });


  useEffect(() => {
    async function fetchingData() {
      let daftarMenu;
      if (nama) {
        daftarMenu = await axios.get(
          `${apiUrl}/Menu/tampilMenu/perNama/${nama}`
        );
      } else {
        daftarMenu = await axios.get(
          `${apiUrl}/Menu/tampilMenu/All`   );
      }
      setOriginalMenu(daftarMenu.data);
      setMenu(daftarMenu.data);
    }
    fetchingData();
  }, [refreshKey, nama, apiUrl]);

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ ...popup, show: false }), 1500);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Cari?nama=${searchQuery}`);
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  const handleFilterMenu = (type) => {
    setActiveFilter(type);
    if (type === "all") {
      setMenu(originalMenu);
    } else {
      const filteredMenu = originalMenu.filter(
        (item) => item.kategori === type
      );
      setMenu(filteredMenu);
    }
  };

  const addKeranjang = async (idmenu) => {
    try {
      const add = await axios.post(
        `${apiUrl}/Keranjang/tambahKeranjang`,
        { id_menu: idmenu, jumlah: 1 }
      );

      if (add.data.error) {
        setPopup({ show: true, message: add.data.error, type: "error" });
      } else {
        setPopup({
          show: true,
          message: "Berhasil menambahkan ke keranjang!",
          type: "success",
        });

        // Update stok di state menu
        setMenu((prevMenu) =>
          prevMenu.map((item) =>
            item.id_menu === idmenu
              ? { ...item, stok: item.stok - 1 } // Kurangi stok 1
              : item
          )
        );
      }
    }
    catch (error) {
      setPopup({
        show: true,
        message: error,
        type: "error",
      });
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <motion.div
      className="p-4 no-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        overflowY: "scroll", // Scroll tetap aktif
        msOverflowStyle: "none", // Edge dan IE
        scrollbarWidth: "none", // Firefox
      }}
    >
      <div className="mb-20">
        <header className="flex justify-between items-center mb-4">
          <Link
            to="/Beranda"
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
          >
            <i className="fas fa-arrow-left text-gray-600"></i>
          </Link>
          <motion.h1
            className="text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Menu
          </motion.h1>
          <div className="w-10 h-10 rounded-full flex items-center justify-center"></div>
        </header>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto mb-4 ">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari"
              className="w-full p-2 pl-10 rounded-full bg-[rgba(167,146,119,0.2)] text-gray-500 focus:outline-none focus:ring-0"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-500"></i>
          </form>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleFilterMenu("all")}
              className={`px-4 py-2 rounded-full font-semibold focus:outline-none ${
                activeFilter === "all"
                  ? "bg-[#A79277] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterMenu("makanan")}
              className={`px-4 py-2 rounded-full font-semibold focus:outline-none ${
                activeFilter === "makanan"
                  ? "bg-[#A79277] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              Makanan
            </button>
            <button
              onClick={() => handleFilterMenu("minuman")}
              className={`px-4 py-2 rounded-full font-semibold focus:outline-none ${
                activeFilter === "minuman"
                  ? "bg-[#A79277] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              Minuman
            </button>
          </div>
        </div>

        {/* Menu Section */}
        <section className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <motion.h2
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Menu
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 text-left">
            {menu.map((item) => (
              <FoodItem
                key={item.id_menu}
                imgSrc={publicUrl + "/images/menu/" + item.gambar} // Pass the image source
                title={item.nama_menu}
                price={formatRupiah(item.harga)}
                stok={item.stok}
                id={item.id_menu}
                addKeranjang={addKeranjang} // Pass addKeranjang function
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
      <LoginValidation />

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 ${
            popup.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <i
            className={`fas ${
              popup.type === "success" ? "fa-check-circle" : "fa-times-circle"
            } mr-2`}
          ></i>
          {popup.message}
        </div>
      )}
    </motion.div>
  );
};

export default App;
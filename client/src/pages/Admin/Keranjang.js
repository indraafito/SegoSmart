import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginValidation from "./components/LoginValidation";
import Footer from "./components/Footer";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const [keranjang, setKeranjang] = useState([]);
  const [totalharga, setTotalHarga] = useState(0);
  const [totalDiskon, setTotalDiskon] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Added state for alert dialog
  const publicUrl = process.env.PUBLIC_URL;
  const apiUrl = process.env.REACT_APP_API_URL

  const handleBackClick = () => {
    navigate("/Beranda");
  };

  const handleCheckoutClick = () => {
    if (!keranjang || keranjang.length === 0) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false); // Sembunyikan notifikasi setelah 3 detik
      }, 2000);
      return;
    }

    navigate("/pembayaran");
    
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    async function fetchingData() {
      try {
        const cartList = await axios.get(
          `${apiUrl}/Keranjang/tampilKeranjang`
        );
        const promises = cartList.data.map((item) => {
          return axios.get(
            `${apiUrl}/Menu/tampilMenu/Byid/${item.id_menu}`
          );
        });
        const responses = await Promise.all(promises);
        const daftarmenu = responses.map((response) => response.data);
        const keranjangmenu = cartList.data.map((item, index) => ({
          ...item,
          menu: daftarmenu[index],
        }));
        const total = keranjangmenu.reduce(
          (accumulator, item) => accumulator + item.sub_total,
          0
        );
        const diskon = keranjangmenu.reduce(
          (accumulator, item) =>
            accumulator + (item.sub_total * item.diskon) / 100,
          0
        );

        setTotalHarga(total);
        setTotalDiskon(diskon);
        setKeranjang(keranjangmenu);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchingData();
  }, [apiUrl]);

  const tambahkeranjang = async (idmenu) => {
    try {
      const add = await axios.post(
       `${apiUrl}/Keranjang/tambahKeranjang`,
        {
          id_menu: idmenu,
          jumlah: 1,
        }
      );

      if (add.data.error) {
        console.log(add.data.error);
      } else {
        setKeranjang((prevKeranjang) => {
          const updatedKeranjang = prevKeranjang.map((item) =>
            item.id_menu === idmenu
              ? {
                  ...item,
                  jumlah: item.jumlah + 1,
                  sub_total: item.sub_total + item.menu.harga,
                }
              : item
          );

          // Recalculate total harga and diskon
          const newTotal = updatedKeranjang.reduce(
            (acc, item) => acc + item.sub_total,
            0
          );
          const newDiskon = updatedKeranjang.reduce(
            (acc, item) => acc + (item.sub_total * item.diskon) / 100,
            0
          );

          setTotalHarga(newTotal);
          setTotalDiskon(newDiskon);

          return updatedKeranjang;
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const kurangiKeranjang = async (idmenu) => {
    try {
      const remove = await axios.post(
        `${apiUrl}/Keranjang/kurangiKeranjang`,
        {
          id_menu: idmenu,
        }
      );

      if (remove.data.error) {
        console.log(remove.data.error);
      } else {
        setKeranjang((prevKeranjang) => {
          const updatedKeranjang = prevKeranjang
            .map((item) =>
              item.id_menu === idmenu
                ? {
                    ...item,
                    jumlah: item.jumlah - 1,
                    sub_total: item.sub_total - item.menu.harga,
                  }
                : item
            )
            .filter((item) => item.jumlah > 0);

          // Recalculate total harga and diskon
          const newTotal = updatedKeranjang.reduce(
            (acc, item) => acc + item.sub_total,
            0
          );
          const newDiskon = updatedKeranjang.reduce(
            (acc, item) => acc + (item.sub_total * item.diskon) / 100,
            0
          );

          setTotalHarga(newTotal);
          setTotalDiskon(newDiskon);

          return updatedKeranjang;
        });
      }
    } catch (error) {
      console.error("Error reducing item in cart:", error);
    }
  };

  const hapusDariKeranjang = (idmenu) => {
    setShowAlert(idmenu); // Simpan idmenu ke dalam state agar bisa digunakan saat konfirmasi
  };

  const konfirmasihapus = async () => {
    if (!showAlert) return; // Pastikan ada item yang dipilih untuk dihapus

    try {
      const remove = await axios.post(
        `${apiUrl}/Keranjang/hapusDariKeranjang`,
        { id_menu: showAlert } // Gunakan idmenu dari state
      );

      if (remove.data.error) {
        console.log(remove.data.error);
      } else {
        setKeranjang((prevKeranjang) => {
          const updatedKeranjang = prevKeranjang.filter(
            (item) => item.id_menu !== showAlert
          );

          // Recalculate total harga and diskon after removal
          const newTotal = updatedKeranjang.reduce(
            (acc, item) => acc + item.sub_total,
            0
          );
          const newDiskon = updatedKeranjang.reduce(
            (acc, item) => acc + (item.sub_total * item.diskon) / 100,
            0
          );

          setTotalHarga(newTotal);
          setTotalDiskon(newDiskon);

          return updatedKeranjang;
        });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setShowAlert(false); // Tutup dialog setelah selesai
    }
  };

  const renderItem = (id, title, image, price, count, category, index) => (
    <div
      className="flex items-center bg-[rgba(167,146,119,0.2)] p-2 rounded-lg"
      key={index}
    >
      <img
        src={publicUrl + "/images/menu/" + image}
        alt={title}
        className="w-12 h-12 rounded-lg mr-4 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
      />
      <div className="flex-grow text-left">
        <h2 className="font-semibold text-xs sm:text-sm md:text-base">
          {title}
        </h2>
        <p className="text-xs sm:text-sm">{category}</p>
        <p className="font-semibold text-xs sm:text-sm md:text-base">
          {formatRupiah(price)}
        </p>
      </div>
      <div className="flex items-center">
        <button
          className="bg-[#D9D9D9] px-[8px] py-[6px] rounded transition transform active:scale-95 mx-[4px]"
          onClick={() => kurangiKeranjang(id)}
        >
          -
        </button>
        <span className="bg-[#D9D9D9] px-[8px] py-[6px] rounded">{count}</span>
        <button
          className="bg-[#D9D9D9] px-[8px] py-[6px] rounded transition transform active:scale-95 mx-[4px]"
          onClick={() => tambahkeranjang(id)}
        >
          +
        </button>
        <button
          className="text-red-500 ml-2"
          onClick={() => hapusDariKeranjang(id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-2 sm:p-3 md:p-4 border border-white rounded-lg h-screen">
      <div className="absolute left-4 top-6 z-20">
        <button
          className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleBackClick}
        >
          <i className="fas fa-chevron-left text-sm"></i>
        </button>
      </div>

      <h1 className="text-center text-lg font-bold mt-6 sm:mt-6 md:mt-6 mb-4 sm:mb-4 md:mb-4">
        Keranjang
      </h1>
      {showNotification && (
        <div className="notification bg-red-500 text-white p-4 rounded mt-4">
          Keranjang kosong. Silakan tambahkan item ke keranjang!
        </div>
      )}
      <div
        className="flex-grow overflow-auto max-h-[calc(100vh-180px)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-3">
          {keranjang.map((item, index) =>
            renderItem(
              item.id_menu,
              item.menu.nama_menu,
              item.menu.gambar,
              item.sub_total,
              item.jumlah,
              item.menu.kategori,
              index
            )
          )}
        </div>
      </div>

      <div className="bg-[rgba(167,146,119,0.2)] p-3 rounded-lg mt-5 lg:mt-1">
        <div className="flex justify-between mb-2 text-xs sm:text-sm md:text-base">
          <span>Subtotal</span>
          <span>{formatRupiah(totalharga)}</span>
        </div>
        <div className="flex justify-between mb-2 text-xs sm:text-sm md:text-base">
          <span>Diskon</span>
          <span>- {formatRupiah(totalDiskon)}</span>
        </div>
        <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
          <span>Total</span>
          <span>{formatRupiah(totalharga - totalDiskon)}</span>
        </div>
      </div>

      <button
        className="w-full bg-[#A79277] text-white py-2 rounded-lg font-semibold text-xs sm:text-sm md:text-base mt-3 mb-20"
        onClick={handleCheckoutClick}
      >
        Lanjut Pembayaran
      </button>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 text-center w-72 sm:w-80 mx-4">
            <i
              className="fas fa-exclamation-circle text-red-500 mx-auto"
              style={{ fontSize: "3rem" }}
            ></i>
            <h2 className="text-lg font-semibold mt-4 text-gray-800">
              Apakah Anda yakin ingin menghapus item ini?
            </h2>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setShowAlert(false)} // Tutup dialog
                className="bg-gray-300 text-black font-semibold rounded-lg py-2 px-4 hover:bg-gray-400"
              >
                Tidak
              </button>
              <button
                onClick={konfirmasihapus} // Konfirmasi penghapusan
                className="bg-red-500 text-white font-semibold rounded-lg py-2 px-4 hover:bg-red-600"
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginValidation />
      <Footer />
    </div>
  );
};

export default App;

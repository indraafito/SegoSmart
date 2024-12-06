import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoginValidation from "./components/LoginValidation";
import axios from "axios";

const App = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  const [riwayats, setRiwayats] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const publicUrl = process.env.PUBLIC_URL;
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchingData() {
      let riwayatList = null
      if (from && to)
      {
        riwayatList = await axios.get(`${apiUrl}/riwayat/tampilRiwayat/filter/?from=${from}&to=${to}`);
      }
      else
      {
        riwayatList = await axios.get(
          `${apiUrl}/riwayat/tampilRiwayat/All`
        );
      }

      const total = riwayatList.data.reduce(
        (accumulator, item) => accumulator + item.total_harga,
        0
      );
      const rating = riwayatList.data.reduce(
        (accumulator, item) => accumulator + item.kepuasan,
        0
      );

      setTotalHarga(total);
      setAverageRating(rating / riwayatList.data.length);

      const promisesItem = riwayatList.data.map((item) => {
        return axios.get(`${apiUrl}/ItemPesanan/itemPesanan/${item.id}`);
      });

      const responsesItem = await Promise.all(promisesItem);

      const items = responsesItem.map((response) => response.data);

      const promisesMenu = items.map(async (item) => {
        return await Promise.all(
          item.map((i) => {
            return axios.get(`${apiUrl}/Menu//tampilMenu/Byid/${i.id_menu}`);
          })
        );
      });

      const responsesMenu = await Promise.all(promisesMenu);

      const menus = responsesMenu.map((responseArray) =>
        responseArray.map((response) => response.data)
      );

      const riwayats = riwayatList.data.map((item, index) => ({
        ...item,
        item: items[index],
        menu: menus[index],
      }));

      setRiwayats(riwayats);
    }

    fetchingData();
  }, [apiUrl, from, to]);
  
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedItem(null);
  };

  const handleBackClick = () => {
    navigate("/Profil");
  };

  const handleDateFromChange = (event) =>
    setSelectedDateFrom(event.target.value);
  const handleDateToChange = (event) => setSelectedDateTo(event.target.value);

  const handleFilter = () =>
  {
    if (!selectedDateFrom && !selectedDateTo){
      window.location.href = `/aktivitas`
      return
    } 
      if (!selectedDateFrom || !selectedDateTo) {
        alert("isi kedua tanggal");
        return;
      }

    window.location.href = `/aktivitas/?from=${selectedDateFrom}&to=${selectedDateTo}`
  }

  const formatDateTime = (mysqlDatetime) => {
    const date = new Date(mysqlDatetime); // Ubah ke objek Date
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Gunakan format 24 jam
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  return (
    <motion.div className="flex flex-col min-h-screen max-w-md mx-auto p-4 sm:p-6 md:p-8 lg:max-w-3xl">
      <motion.div
        className="fixed top-0 left-0 w-full pb-2 z-40 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center justify-between w-full">
          <button
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer mt-4 ml-4"
            onClick={handleBackClick}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h1 className="flex-grow text-center font-bold text-xl sm:text-2xl mt-4 mr-[60px]">
            Aktivitas
          </h1>
        </div>

        <motion.div
          className="mt-4 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div>
            <label
              htmlFor="dateFrom"
              className="text-sm sm:text-base font-semibold"
            >
              Dari Tanggal:
            </label>
            <input
              id="dateFrom"
              type="date"
              value={selectedDateFrom}
              onChange={handleDateFromChange}
              className="ml-2 py-1 px-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="dateTo"
              className="text-sm sm:text-base font-semibold"
            >
              Sampai Tanggal:
            </label>
            <input
              id="dateTo"
              type="date"
              value={selectedDateTo}
              onChange={handleDateToChange}
              className="ml-2 py-1 px-2 border border-gray-300 rounded"
            />
          </div>
          <button
            class="flex items-center px-4 py-2 bg-[#A79277] text-white rounded-lg shadow hover:bg-[#504540]"
            onClick={handleFilter}
          >
            <i class="fas fa-search"></i>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-grow pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="mt-20 ">
          <div className="space-y-4 pb-24">
            {riwayats.map((riwayat, index) => (
              <motion.div
                key={index}
                className={`bg-gray-200 p-4 rounded-lg flex sm:p-6 cursor-pointer ${
                  index === riwayats.length - 1 ? "mb-4" : ""
                }`}
                onClick={() => handleItemClick(riwayat)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <img
                  key={index} // Tambahkan key untuk elemen dalam iterasi
                  src={publicUrl + "/images/menu/" + riwayat.menu[0].gambar}
                  alt="Food item"
                  className="w-16 h-16 rounded-lg mr-4 sm:w-20 sm:h-20"
                />
                <div className="flex-grow">
                  <h2 className="font-bold text-sm sm:text-base text-left">
                    {riwayat.menu.map((m, index) => {
                      if (index !== riwayat.menu.length - 1) {
                        return m.nama_menu + ", ";
                      }
                      return m.nama_menu + ".";
                    })}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm text-left">
                    {formatDateTime(riwayat.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm sm:text-base">
                    {formatRupiah(riwayat.total_harga)}
                  </p>
                  <div className="flex justify-end space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < riwayat.kepuasan
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 mx-auto sm:w-[calc(100%-2rem)] max-w-3xl pt-2 pb-4 z-40 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="space-y-2">
          <p className="font-bold text-sm sm:text-base bg-[#D9D9D9] p-2 rounded">
            Rata-rata rating
            <span className="text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${
                    i < averageRating ? "text-yellow-500" : "text-gray-400"
                  }`}
                ></i>
              ))}
            </span>
          </p>
          <p className="font-bold text-sm sm:text-base bg-[#D9D9D9] p-2 rounded">
            Total {formatRupiah(totalHarga)}
          </p>
        </div>
      </motion.div>
      {isPopupVisible && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* ID Riwayat di Pojok Kiri */}
            <div className="absolute top-4 left-4 text-sm font-bold">
              {selectedItem.id}
            </div>
            {/* Tombol Tutup */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={closePopup}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="text-center mb-4">
              <p className="font-bold text-lg">{selectedItem.date}</p>
            </div>
            <div>
              <p className="font-bold mb-2">Ringkasan Pesanan</p>
              {selectedItem.item.map((i, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>
                    {selectedItem.menu[index].nama_menu} x{i.jumlah}
                  </span>
                  <span>
                    {formatRupiah(i.sub_total)}(-
                    {(i.sub_total * i.diskon) / 100})
                  </span>
                </div>
              ))}
              <br />
              <div className="flex justify-between items-center font-bold">
                <span>Total Awal</span>
                <span>{formatRupiah(selectedItem.total_temp)}</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total Diskon</span>
                <span>{formatRupiah(selectedItem.total_diskon)}</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>{formatRupiah(selectedItem.total_harga)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginValidation />
    </motion.div>
  );
};

export default App;

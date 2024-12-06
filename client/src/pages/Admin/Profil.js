import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import LoginValidation from "./components/LoginValidation";

const App = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const publicUrl = process.env.PUBLIC_URL

  // Fungsi logout
  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("admin");

    // Arahkan pengguna ke halaman login
    navigate("/login");
  };

  // Fungsi navigasi ke halaman lain
  const goToAccount = () => navigate("/infoakun");
  const gotoHalPel = () => navigate("/berandap");
  const goToActivity = () => navigate("/aktivitas");
  const goToPromo = () => navigate("/promo");
  const goToMenu = () => navigate("/Kelolamenu");

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center mt-10 w-full">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 lg:space-x-8 mb-6 w-full max-w-screen-lg px-2">
          <img
            src={`${publicUrl}/images/menu/Sego Resek Jingkrak Hitam.png`}
            alt="Sego Resek Jingkrak Hitam"
            className="rounded-full shadow-lg w-28 h-28 object-cover mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Sego Resek Jingkrak
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500">
              segoresekjingkraktrssby@gmail.com
            </p>
          </div>
        </div>

        {/* Informasi Akun, Aktivitas, Promo Sections */}
        <div className="w-full max-w-screen-lg px-2 md:mx-4">
          <div
            className="bg-gray-200 rounded-lg py-4 px-6 mb-4 flex justify-between items-center w-full cursor-pointer"
            onClick={goToAccount}
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl">
              Informasi Akun
            </span>
            <i className="fas fa-chevron-right text-gray-600"></i>
          </div>
          <div
            className="bg-gray-200 rounded-lg py-4 px-6 mb-4 flex justify-between items-center w-full cursor-pointer"
            onClick={gotoHalPel}
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl">
              Halaman Pelanggan
            </span>
            <i className="fas fa-chevron-right text-gray-600"></i>
          </div>

          <div
            className="bg-gray-200 rounded-lg py-4 px-6 mb-4 flex justify-between items-center w-full cursor-pointer"
            onClick={goToActivity}
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl">
              Aktivitas
            </span>
            <i className="fas fa-chevron-right text-gray-600"></i>
          </div>
          <div
            className="bg-gray-200 rounded-lg py-4 px-6 mb-4 flex justify-between items-center w-full cursor-pointer"
            onClick={goToMenu}
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl">
              Menu
            </span>
            <i className="fas fa-chevron-right text-gray-600"></i>
          </div>

          <div
            className="bg-gray-200 rounded-lg py-4 px-6 mb-4 flex justify-between items-center w-full cursor-pointer"
            onClick={goToPromo}
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl">
              Promo
            </span>
            <i className="fas fa-chevron-right text-gray-600"></i>
          </div>

          {/* Tombol Logout */}
          <div
            onClick={handleLogout}
            className="bg-gray-200 rounded-lg py-4 px-6 mb-4 flex justify-between items-center w-full cursor-pointer"
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl">
              Logout
            </span>
            <i className="fas fa-chevron-right text-gray-600"></i>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Footer />
      <LoginValidation />
    </div>
  );
};

export default App;

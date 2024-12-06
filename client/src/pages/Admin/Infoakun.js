import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Perubahanakun = () => {
  const navigate = useNavigate();
  const publicUrl = process.env.PUBLIC_URL;

  const handleBack = () => {
    navigate("/profil");
  };

  return (
    <motion.div
      className="bg-white flex items-start justify-center min-h-screen p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute left-4 top-6 z-20">
        <button
          onClick={handleBack}
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl px-4 sm:px-8 md:px-8 lg:px-10 xl:px-12 mt-10 flex flex-col items-center justify-start space-y-6 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10">
        <motion.h1
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Informasi Akun
        </motion.h1>

        <div className="text-center mb-4">
          <div className="relative inline-block mb-8">
            <img
              src={`${publicUrl}/images/menu/Sego Resek Jingkrak Hitam.png`}
              alt="Sego Resek Jingkrak Hitam"
              className="w-full h-full sm:h-40 md:h-40 object-cover rounded-lg mb-2"
            />
          </div>
        </div>

        <div className="w-full space-y-3 mt-5">
          <div className="flex items-center">
            <label className="block text-sm font-semibold w-24 text-left pl-2 sm:text-base">
              Nama
            </label>
            <input
              type="text"
              value="Sego Resek Jingkrak"
              className="flex-1 border-b-2 border-gray-300 focus:outline-none"
              readOnly
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-semibold w-24 text-left pl-2 sm:text-base">
              Nomor HP
            </label>
            <input
              type="text"
              value="0895811107744"
              className="flex-1 border-b-2 border-gray-300 focus:outline-none"
              readOnly
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-semibold w-24 text-left pl-2 sm:text-base">
              Email
            </label>
            <input
              type="text"
              value="segoresekjingkrak@gmail.com"
              className="flex-1 border-b-2 border-gray-300 focus:outline-none"
              readOnly
            />
          </div>

          {/* Map Location */}
          <div className="w-full mt-5 flex justify-center items-center">
            <div className="w-full h-full mt-3 flex justify-center items-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31321.808425838626!2d112.59715557065893!3d-7.9666125200040385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7883eaa135f695%3A0xe5d4a66b051dfae!2sSego%20Resek%20Terusan%20Surabaya!5e0!3m2!1sid!2sid!4v1733383173160!5m2!1sid!2sid"
                width="50%"
                height="120"
                style={{ border: "2px solid black" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="max-w-xs w-full h-[200px] rounded-xl"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Perubahanakun;
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CheckCircleIcon } from "@heroicons/react/solid";
import { motion } from 'framer-motion';

export default function App() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSavePassword = () => {
        setShowPopup(true); // Tampilkan popup setelah password disimpan
    };

    const closePopup = () => {
        setShowPopup(false); // Menutup popup
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen mt-8 sm:mt-0" // Add margin-top for mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-sm min-h-screen sm:min-h-0"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            >
                <motion.h1
                    className="text-2xl font-bold mb-2 text-center sm:text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Password Baru
                </motion.h1>
                <div className="mb-4">
                    <div className="flex items-center bg-[#D9D9D9] rounded-lg p-2">
                        <i className="fas fa-lock text-[#A79277] mr-2"></i>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="bg-[#D9D9D9] outline-none flex-1 text-sm"
                            placeholder="Masukkan password baru"
                        />
                        <i
                            className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-[#A79277] cursor-pointer`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                </div>
                <motion.button
                    className="bg-[#A79277] hover:bg-[#8c7b66] text-white rounded-lg w-full py-2 font-poppins font-bold transition duration-200"
                    onClick={handleSavePassword}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Simpan
                </motion.button>
            </motion.div>

            {showPopup && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 text-center w-72 sm:w-80 mx-4"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <CheckCircleIcon className="h-16 w-16 text-[#A79277] mx-auto" />
                        <motion.h2
                            className="text-lg font-semibold mt-4 text-[#A79277]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Password baru berhasil disimpan
                        </motion.h2>
                        <motion.button
                            className="mt-6 bg-[#D9D9D9] text-black font-semibold rounded-lg py-2 px-4 hover:bg-[#D1D1D1]"
                            onClick={closePopup}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.2 }}
                        >
                            Tutup
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}

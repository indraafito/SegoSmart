import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

function LupaPassword() {
    const [showPopup, setShowPopup] = useState(false);
    const [showResendPopup, setShowResendPopup] = useState(false);

    const navigate = useNavigate();  // Initialize navigate

    const handleSendEmail = () => {
        setShowPopup(true); // Tampilkan popup konfirmasi pengiriman email
    };

    const handleResendEmail = () => {
        setShowResendPopup(true); // Tampilkan popup konfirmasi pengiriman ulang email
    };

    const closePopup = () => {
        setShowPopup(false); // Tutup popup konfirmasi pengiriman pertama
        setShowResendPopup(false); // Tutup popup konfirmasi pengiriman ulang
    };

    const handleBackClick = () => {
        navigate('/login');  // Navigate to the login page
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Back Button Positioned in the Top-Left Corner without background */}
            <div
                onClick={handleBackClick}
                className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-300 rounded-full"
            >
                <i className="fas fa-chevron-left"></i> {/* White arrow icon */}
            </div>

            <motion.div
                className="w-full max-w-md p-6 bg-white rounded-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            >
                <motion.h1
                    className="text-2xl font-bold text-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Lupa Password
                </motion.h1>
                <motion.p
                    className="text-center text-[#A79277] mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Masukkan email akun Anda, kami akan mengirimkan link reset password
                </motion.p>
                <motion.p
                    className="text-center text-[#A79277] mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Belum menerima Email?{' '}
                    <span
                        className="text-red-500 cursor-pointer"
                        onClick={handleResendEmail}
                    >
                        Klik disini
                    </span>
                </motion.p>
                <div className="flex items-center bg-[#D9D9D9] rounded-lg mb-4 p-2">
                    <i className="fas fa-envelope text-[#A79277] mr-2"></i>
                    <input
                        type="email"
                        className="bg-[#D9D9D9] outline-none flex-1 text-sm border-0"
                        placeholder="Email"
                    />
                </div>

                {/* Tombol Kirim Email dengan animasi zoom */}
                <motion.button
                    className="bg-[#A79277] hover:bg-[#8c7b66] text-white rounded-lg w-full py-2 font-poppins font-bold transition duration-200 transform hover:scale-105"
                    onClick={handleSendEmail}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 0.2 }}
                    whileHover={{ scale: 1.05 }} // Efek animasi saat di-hover (sedikit memperbesar)
                    whileTap={{ scale: 0.98 }} // Efek animasi saat ditekan (sedikit mengecil)
                >
                    Kirim Email
                </motion.button>

                {/* Popup konfirmasi pertama kali mengirim email */}
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
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                            <h2 className="text-lg font-semibold mt-4">Link password telah terkirim ke email Anda</h2>
                            <button
                                className="mt-6 bg-[#D9D9D9] text-black font-semibold rounded-lg py-2 px-4 hover:bg-[#D1D1D1]"
                                onClick={closePopup}
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Popup konfirmasi pengiriman ulang email */}
                {showResendPopup && (
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
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                            <h2 className="text-lg font-semibold mt-4">Berhasil mengirim ulang link reset password</h2>
                            <button
                                className="mt-6 bg-[#D9D9D9] text-black font-semibold rounded-lg py-2 px-4 hover:bg-[#D1D1D1]"
                                onClick={closePopup}
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default LupaPassword;

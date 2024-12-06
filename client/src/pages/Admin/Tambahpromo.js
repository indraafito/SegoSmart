import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoginValidation from "./components/LoginValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddPromo = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromoExists, setIsPromoExists] = useState(false);
  const [Menu, setMenu] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  function closeModal() {
    setIsModalOpen(false);
    setIsPromoExists(false);
  }

  // Handle the back navigation to the /promo page
  const handleBackClick = () => {
    navigate("/promo");
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiUrl}/Menu/tampilMenu/All`);
      setMenu(response.data);
    }
    fetchData();
  }, [apiUrl]);

  const initialValues = {
    id_menu: "",
    nama_promo: "",
    diskon: "",
    deskripsi: "",
  };

  const validationSchema = Yup.object().shape({
    id_menu: Yup.string().required("Menu harus dipilih."),
    nama_promo: Yup.string().required("Nama promo tidak boleh kosong."),
    diskon: Yup.number("Diskon harus berupa angka.").required(
      "Diskon tidak boleh kosong."
    ),
    deskripsi: Yup.string().required("Deskripsi tidak boleh kosong."),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/Promo/tambahPromo`, data);

      // Memastikan kondisi jika promo sudah ada
      if (
        response.data.success === false &&
        response.data.message === "Promo sudah ada untuk menu ini"
      ) {
        setIsPromoExists(true); // Tampilkan modal jika promo sudah ada
      } else if (response.data.success) {
        setIsModalOpen(true); // Tampilkan modal sukses jika promo berhasil ditambahkan
      }
    } catch (error) {
      // Menangani error jika terjadi kesalahan
      console.error("Error adding promo:", error);
      setIsPromoExists(true); // Tampilkan modal jika terjadi error yang mengindikasikan promo sudah ada
    }
  };



  return (
    <div className="container mx-auto sm:px-2 md:px-4 lg:px-8 xl:px-12 p-4 rounded-lg relative">
      {/* Tombol Back di kiri atas */}
      <div className="absolute left-4 top-4 z-10">
        <button
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleBackClick} // Navigate back to /promo
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-4xl"
              />
            </div>
            <h2 className="text-lg font-bold">Promo berhasil ditambahkan</h2>
            <p className="text-gray-600 mt-2">
              Promo telah berhasil ditambahkan ke daftar promo Anda.
            </p>
            <button
              onClick={() => {
                closeModal();
                navigate("/promo"); // Arahkan ke halaman promo
              }}
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Lihat di Promo
            </button>
          </div>
        </div>
      )}

      {/* Modal jika promo sudah ada */}
      {isPromoExists && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-red-500 text-4xl"
              />
            </div>
            <h2 className="text-lg font-bold">Promo Sudah Ada</h2>
            <p className="text-gray-600 mt-2">
              Promo dengan nama yang sama sudah ada di daftar promo Anda.
            </p>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        Menu={Menu}
      >
        <Form>
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-center sm:text-xl">
              Tambahkan Promo & Stok
            </h2>
            <div className="space-y-4">
              <h3 className="text-md font-bold text-left mt-4">
                Informasi Promo
              </h3>

              {/* Nama Promo */}
              <div className="flex items-center space-y-2">
                <label className="block font-semibold w-full sm:w-1/4 text-left">
                  Nama Promo
                </label>
                <Field
                  type="text"
                  name="nama_promo"
                  placeholder="Masukkan Nama promo"
                  className="w-full sm:w-3/4 p-2 mt-1 bg-[rgba(167,146,119,0.2)] rounded-md"
                />
              </div>
              <ErrorMessage
                name="nama_promo"
                component="span"
                className="text-red-500 text-sm"
              />

              {/* Potongan Harga */}
              <div className="flex items-center space-y-2">
                <label className="block font-semibold w-full sm:w-1/4 text-left">
                  Diskon _%
                </label>
                <Field
                  type="text"
                  name="diskon"
                  placeholder="Masukkan Potongan Harga"
                  className="w-full sm:w-3/4 p-2 mt-1 bg-[rgba(167,146,119,0.2)] rounded-md"
                />
              </div>
              <ErrorMessage
                name="diskon"
                component="span"
                className="text-red-500 text-sm"
              />

              {/* Daftar Menu */}

              <div className="flex items-center space-y-2">
                <label className="block font-semibold w-full sm:w-1/4 text-left">
                  Daftar Menu
                </label>
                <Field
                  as="select"
                  name="id_menu"
                  className="w-full sm:w-3/4 p-2 mt-1 bg-[rgba(167,146,119,0.2)] rounded-md"
                >
                  <option value="">Pilih daftar menu</option>
                  {Menu.map((menu) => (
                    <option key={menu.id_menu} value={menu.id_menu}>
                      {menu.nama_menu}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="id_menu"
                component="span"
                className="text-red-500 text-sm"
              />

              {/* Deskripsi */}
              <div className="flex items-start space-y-2">
                <label className="block font-semibold w-full sm:w-1/4 text-left">
                  Deskripsi
                </label>
                <Field
                  as="textarea"
                  name="deskripsi"
                  placeholder="Masukkan Deskripsi"
                  className="w-full sm:w-3/4 p-2 mt-1 bg-[rgba(167,146,119,0.2)] rounded-md h-24"
                ></Field>
              </div>
              <ErrorMessage
                name="deskripsi"
                component="span"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              className="px-2 py-1 sm:px-3 sm:py-2 bg-green-500 text-white rounded-md"
              type="submit"
            >
              Tambah Promo
            </button>
          </div>
          <LoginValidation />
        </Form>
      </Formik>
    </div>
  );
};

export default AddPromo;

import "./App.css";
import Judul from "./pages/Admin/Tampilanpembuka.js";
import Login from "./pages/Admin/Login.js";
import Lupapassword from "./pages/Admin/Lupapassword.js";
import Passwordbaru from "./pages/Admin/Passwordbaru.js";
import Beranda from "./pages/Admin/Beranda.js";
import Cari from "./pages/Admin/Cari.js";
import Infopromo from "./pages/Admin/Infopromo.js";
import Infomenu from "./pages/Admin/Infomenu.js";
import Keranjang from "./pages/Admin/Keranjang.js";
import Pembayaran from "./pages/Admin/Pembayaran.js";
import Kelolamenu from "./pages/Admin/Kelolamenu.js";
import Tambahmenu from "./pages/Admin/Tambahmenu.js";
import Profil from "./pages/Admin/Profil.js";
import Infoakun from "./pages/Admin/Infoakun.js";
import Aktivitas from "./pages/Admin/Aktivitas.js";
import Tambahpromo from "./pages/Admin/Tambahpromo.js";
import Promo from "./pages/Admin/Promo.js";
import Editmenu from "./pages/Admin/Editmenu.js";
import Menup from "./pages/Pelanggan/Menu.js";
import Berandap from "./pages/Pelanggan/Beranda.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Define all the routes and their respective components */}
          <Route path="/" element={<Judul />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Lupapassword" element={<Lupapassword />} />
          <Route path="/Passwordbaru" element={<Passwordbaru />} />
          <Route path="/Beranda" element={<Beranda />} />
          <Route path="/Cari" element={<Cari />} />
          <Route path="/Infopromo/:id" element={<Infopromo />} />
          <Route path="/Infomenu/:nama" element={<Infomenu />} />
          <Route path="/Keranjang" element={<Keranjang />} />
          <Route path="/Pembayaran" element={<Pembayaran />} />
          <Route path="/Kelolamenu" element={<Kelolamenu />} />
          <Route path="/Tambahmenu" element={<Tambahmenu />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/Infoakun" element={<Infoakun />} />
          <Route path="/Aktivitas" element={<Aktivitas />} />
          <Route path="/Promo" element={<Promo />} />
          <Route path="/Tambahpromo" element={<Tambahpromo />} />
          <Route path="/Editmenu/:id_menu" element={<Editmenu />} />
          <Route path="/Menup" element={<Menup />} />
          <Route path="/Berandap" element={<Berandap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

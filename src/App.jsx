import { useState } from "react";
import Header from "./components/Header";
import DaftarBahan from "./components/DaftarBahan";
import FormRestock from "./components/FormRestock";
import RiwayatRestock from "./components/RiwayatRestock";
import DaftarMenu from "./components/DaftarMenu";
import bahanAwal from "./data/bahanAwal";
import menuData from "./data/menuData";
import "./App.css";

function App() {
  const [daftarBahan, setDaftarBahan] = useState(bahanAwal);
  const [riwayatRestock, setRiwayatRestock] = useState([]);
  const [tabAktif, setTabAktif] = useState("bahan");

  function handleRestock(bahanId, qty) {
    const bahan = daftarBahan.find((b) => b.id === bahanId);
    if (!bahan) return;

    setDaftarBahan(
      daftarBahan.map((b) =>
        b.id === bahanId ? { ...b, stok: b.stok + qty } : b
      )
    );

    const entriBaru = {
      id: Date.now(),
      namaBahan: bahan.nama,
      qty,
      satuan: bahan.satuan,
      waktu: new Date().toLocaleString("id-ID"),
    };
    setRiwayatRestock([entriBaru, ...riwayatRestock]);
  }

  return (
    <div className="app">
      <Header tabAktif={tabAktif} onGantiTab={setTabAktif} />

      <main className="main">
        {tabAktif === "bahan" && (
          <section>
            <h2>Daftar Bahan</h2>
            <DaftarBahan daftarBahan={daftarBahan} />
          </section>
        )}

        {tabAktif === "menu" && (
          <section>
            <h2>Daftar Menu</h2>
            <DaftarMenu menuData={menuData} daftarBahan={daftarBahan} />
          </section>
        )}

        {tabAktif === "restock" && (
          <section>
            <h2>Restock Bahan</h2>
            <FormRestock daftarBahan={daftarBahan} onRestock={handleRestock} />
            <RiwayatRestock riwayat={riwayatRestock} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

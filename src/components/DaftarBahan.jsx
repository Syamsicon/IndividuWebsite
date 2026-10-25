import { estimasiSisaCup, hargaSatuan, formatRupiah } from "../utils/kalkulasi";
import menuData from "../data/menuData";

function DaftarBahan({ daftarBahan }) {
  if (daftarBahan.length === 0) {
    return <p className="kosong">Belum ada data bahan.</p>;
  }

  return (
    <div className="daftar-bahan">
      {daftarBahan.map((bahan) => {
        const estimasi = estimasiSisaCup(bahan, menuData);
        const hampirHabis = estimasi && estimasi.sisaCup <= 3;

        return (
          <div key={bahan.id} className={hampirHabis ? "bahan-card hampir-habis" : "bahan-card"}>
            <div className="bahan-head">
              <span className="bahan-nama">{bahan.nama}</span>
              <span className="bahan-harga">{formatRupiah(hargaSatuan(bahan))}/{bahan.satuan}</span>
            </div>
            <p className="bahan-stok">
              Stok: {bahan.stok} {bahan.satuan}
            </p>
            {estimasi ? (
              <p className={hampirHabis ? "bahan-estimasi warning" : "bahan-estimasi"}>
                Cukup untuk ~{estimasi.sisaCup} cup lagi (tercepat habis: {estimasi.menuNama})
              </p>
            ) : (
              <p className="bahan-estimasi">Belum dipakai di menu manapun</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DaftarBahan;

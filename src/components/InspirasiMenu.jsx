import { useState, useEffect } from "react";

const API_URL = "https://api.sampleapis.com/coffee/iced";
const TIMEOUT_MS = 8000;

function InspirasiMenu() {
  const [status, setStatus] = useState("loading"); // "loading" / "success" / "error"
  const [data, setData] = useState([]);
  const [pesanError, setPesanError] = useState("");
  const [percobaan, setPercobaan] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let dibatalkan = false; // true kalau komponen di-unmount / efek diulang
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    async function ambilData() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Server membalas dengan status " + res.status);
        }
        const json = await res.json();
        if (!Array.isArray(json)) {
          throw new Error("Format data dari server tidak sesuai");
        }
        if (dibatalkan) return;
        setData(json);
        setStatus("success");
      } catch (err) {
        if (dibatalkan) return;
        setPesanError(
          err.name === "AbortError"
            ? "Server tidak merespons (timeout)."
            : err.message || "Terjadi kesalahan jaringan."
        );
        setStatus("error");
      } finally {
        clearTimeout(timer);
      }
    }

    ambilData();

    return () => {
      dibatalkan = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [percobaan]);

  function cobaLagi() {
    setStatus("loading");
    setPercobaan(percobaan + 1);
  }

  if (status === "loading") {
    return <p className="status-api">Memuat inspirasi menu dari API...</p>;
  }

  if (status === "error") {
    return (
      <div className="status-api status-error">
        <p>Gagal memuat data: {pesanError}</p>
        <button onClick={cobaLagi}>Coba Lagi</button>
      </div>
    );
  }

  if (data.length === 0) {
    return <p className="kosong">Belum ada data inspirasi menu.</p>;
  }

  return (
    <div className="daftar-inspirasi">
      {data.map((item) => (
        <div key={item.id} className="inspiration-card">
          <h3>{item.title}</h3>
          <p className="inspiration-desc">{item.description}</p>
          <div className="inspirasi-bahan">
            {(item.ingredients || []).map((bahan) => (
              <span key={item.id + "-" + bahan} className="chip">
                {bahan}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InspirasiMenu;
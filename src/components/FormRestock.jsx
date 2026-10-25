import { useState } from "react";

function FormRestock({ daftarBahan, onRestock }) {
  const [bahanId, setBahanId] = useState(daftarBahan[0]?.id || "");
  const [qty, setQty] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const qtyAngka = parseFloat(qty);
    if (!bahanId || !qtyAngka || qtyAngka <= 0) return;

    onRestock(bahanId, qtyAngka);
    setQty("");
  }

  return (
    <form className="form-restock" onSubmit={handleSubmit}>
      <h3>Restock Bahan</h3>

      <label htmlFor="pilih-bahan">Pilih Bahan</label>
      <select
        id="pilih-bahan"
        value={bahanId}
        onChange={(e) => setBahanId(e.target.value)}
      >
        {daftarBahan.map((bahan) => (
          <option key={bahan.id} value={bahan.id}>
            {bahan.nama} ({bahan.satuan})
          </option>
        ))}
      </select>

      <label htmlFor="qty-restock">Jumlah Tambahan</label>
      <input
        id="qty-restock"
        type="number"
        min="0"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        placeholder="contoh: 1000"
      />

      <button type="submit">Tambah Stok</button>
    </form>
  );
}

export default FormRestock;

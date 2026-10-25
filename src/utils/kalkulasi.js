// Harga per satuan 1 bahan (harga kemasan / isi kemasan)
export function hargaSatuan(bahan) {
  if (!bahan.isiKemasan) return 0;
  return bahan.hargaKemasan / bahan.isiKemasan;
}

// Cari semua menu yang memakai bahan tertentu, hitung pemakaian per cup,
// lalu kembalikan estimasi sisa cup (stok bahan / pemakaian per cup) yang paling kecil beserta nama menu yang jadi bottleneck-nya.
export function estimasiSisaCup(bahan, menuData) {
  let hasil = null;

  menuData.forEach((menu) => {
    const dipakai = menu.bahan.filter((b) => b.bahanId === bahan.id);
    if (dipakai.length === 0) return;

    const totalPerBatch = dipakai.reduce((sum, b) => sum + b.qty, 0);
    const perCup = totalPerBatch / menu.yield;
    if (perCup <= 0) return;

    const sisaCup = Math.floor(bahan.stok / perCup);
    if (hasil === null || sisaCup < hasil.sisaCup) {
      hasil = { sisaCup, menuNama: menu.nama };
    }
  });

  return hasil; // null kalau bahan ini belum dipakai menu manapun
}

// Total cost bahan untuk satu menu (per cup/porsi)
export function costPerCup(menu, daftarBahan) {
  const totalBatch = menu.bahan.reduce((sum, item) => {
    const bahan = daftarBahan.find((b) => b.id === item.bahanId);
    if (!bahan) return sum;
    return sum + item.qty * hargaSatuan(bahan);
  }, 0);
  return totalBatch / menu.yield;
}

export function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toLocaleString("id-ID");
}

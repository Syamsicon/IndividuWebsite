// Data awal bahan BrewIT.
// "stok" diasumsikan 1 kemasan baru untuk tiap bahan kemasan,
// kecuali Air/Es Batu/Espresso yang diisi angka awal yang masuk akal.
const bahanAwal = [
  { id: "susu-uht", nama: "Susu UHT (Greenfields)", satuan: "ml", stok: 1000, hargaKemasan: 22000, isiKemasan: 1000 },
  { id: "susu-regal", nama: "Susu Regal (Cimory)", satuan: "ml", stok: 750, hargaKemasan: 15000, isiKemasan: 750 },
  { id: "biskuit-marie", nama: "Biskuit Marie (Regal)", satuan: "gr", stok: 230, hargaKemasan: 24000, isiKemasan: 230 },
  { id: "krim-bubuk", nama: "Krim Bubuk (Coffee Matte)", satuan: "gr", stok: 450, hargaKemasan: 33500, isiKemasan: 450 },
  { id: "teh-melati", nama: "Teh Hijau Melati (Tongji)", satuan: "gr", stok: 50, hargaKemasan: 5000, isiKemasan: 50 },
  { id: "gula-pasir", nama: "Gula Pasir (Gulaku)", satuan: "gr", stok: 1000, hargaKemasan: 17500, isiKemasan: 1000 },
  { id: "sirup-jeruk", nama: "Sirup Jeruk (Sunquick)", satuan: "ml", stok: 300, hargaKemasan: 36500, isiKemasan: 300 },
  { id: "keju-oles", nama: "Keju Oles (Prochiz)", satuan: "gr", stok: 160, hargaKemasan: 13500, isiKemasan: 160 },
  { id: "selai-stroberi", nama: "Selai Stroberi (Morin)", satuan: "gr", stok: 170, hargaKemasan: 25400, isiKemasan: 170 },
  { id: "roti-tawar", nama: "Roti Tawar (Sari Roti)", satuan: "lembar", stok: 10, hargaKemasan: 18000, isiKemasan: 10 },
  { id: "margarin", nama: "Butter Margarin (Palmia)", satuan: "gr", stok: 200, hargaKemasan: 10000, isiKemasan: 200 },
  { id: "agar-agar", nama: "Agar-Agar (Swallow Globe)", satuan: "bungkus", stok: 1, hargaKemasan: 5500, isiKemasan: 1 },
  { id: "maizena", nama: "Maizena (Maizenaku)", satuan: "gr", stok: 100, hargaKemasan: 5500, isiKemasan: 100 },
  { id: "teh-hitam", nama: "Teh Hitam (Prendjak)", satuan: "gr", stok: 50, hargaKemasan: 3500, isiKemasan: 50 },
  { id: "sirup-butterscotch", nama: "Sirup Butterscotch (Delifru)", satuan: "ml", stok: 1000, hargaKemasan: 111000, isiKemasan: 1000 },
  { id: "sirup-caramel", nama: "Sirup Caramel (Delifru)", satuan: "ml", stok: 1000, hargaKemasan: 111000, isiKemasan: 1000 },
  { id: "sirup-cream-cheese", nama: "Sirup Cream Cheese (Delifru)", satuan: "ml", stok: 1000, hargaKemasan: 111000, isiKemasan: 1000 },
  { id: "sirup-strawberry", nama: "Sirup Strawberry (Masterista)", satuan: "ml", stok: 850, hargaKemasan: 110000, isiKemasan: 850 },
  { id: "sea-salt", nama: "Sea Salt", satuan: "gr", stok: 300, hargaKemasan: 31000, isiKemasan: 300 },
  { id: "madu", nama: "Madu", satuan: "ml", stok: 100, hargaKemasan: 32500, isiKemasan: 100 },
  { id: "whipped-cream", nama: "Whipped Cream", satuan: "ml", stok: 1000, hargaKemasan: 136000, isiKemasan: 1000 },
  { id: "espresso", nama: "Espresso", satuan: "shot", stok: 50, hargaKemasan: 3863, isiKemasan: 1 },
  { id: "kopi-biji", nama: "Kopi Biji (Arabica Wine)", satuan: "gr", stok: 200, hargaKemasan: 150000, isiKemasan: 200 },
  { id: "air", nama: "Air", satuan: "ml", stok: 5000, hargaKemasan: 0, isiKemasan: 1 },
  { id: "es-batu", nama: "Es Batu", satuan: "gr", stok: 5000, hargaKemasan: 0, isiKemasan: 1 },
  { id: "lemon-slice", nama: "Lemon Slice", satuan: "slice", stok: 15, hargaKemasan: 15000, isiKemasan: 15 },
];

export default bahanAwal;

// ===== 1. Data dummy dasar =====
const daftarMenuDasar = [
  { nama: "Kopi Susu Regal", bahan: ["1 saset kopi", "50ml susu full cream", "18ml susu full cream (foam)", "50ml susu regal", "12,5gr krim kental manis", "10gr Regal", "15gr krim bubuk"], cost: 5988 },
  { nama: "Jasmine Tea", bahan: ["10gr teh jasmine", "600ml susu UHT", "42gr gula"], cost: 3810 },
  { nama: "Strawberry Cheese Cloud", bahan: ["140ml susu UHT", "20gr strawberry jam", "12,5ml krim kental manis", "7,5gr krim bubuk", "20gr keju Prochiz"], cost: 6809 },
  { nama: "Americanorage", bahan: ["1 saset kopi", "10ml sari jeruk"], cost: 2187 }
];

// Harga per satuan tiap bahan
const hargaBahan = {
  "kopi": { harga: 980, satuan: "saset" },
  "susu-full-cream": { harga: 22, satuan: "ml" },
  "susu-regal": { harga: 19.73, satuan: "ml" },
  "krim-kental-manis": { harga: 31.08, satuan: "gr" },
  "regal": { harga: 81.67, satuan: "gr" },
  "teh-jasmine": { harga: 120, satuan: "gr" },
  "gula": { harga: 20, satuan: "gr" },
  "keju-prochiz": { harga: 79.38, satuan: "gr" },
  "strawberry-jam": { harga: 54.67, satuan: "gr" },
  "krim-bubuk": { harga: 88, satuan: "gr" },
  "sari-jeruk": { harga: 120.67, satuan: "ml" },
  "bubuk-coklat": { harga: 217.5, satuan: "gr" }
};

const namaTampil = {
  "kopi": "kopi", "susu-full-cream": "susu full cream", "susu-regal": "susu regal",
  "krim-kental-manis": "krim kental manis", "regal": "Regal", "teh-jasmine": "teh jasmine",
  "gula": "gula", "keju-prochiz": "keju Prochiz", "strawberry-jam": "strawberry jam",
  "krim-bubuk": "krim bubuk", "sari-jeruk": "sari jeruk", "bubuk-coklat": "bubuk coklat"
};

function ambilSemuaMenu() {
  const simpanan = localStorage.getItem("brewit_menu_tambahan");
  const tambahan = simpanan ? JSON.parse(simpanan) : [];

  const dasarDitandai = daftarMenuDasar.map(function (m, i) {
    return Object.assign({}, m, { tipe: "dasar", idx: i });
  });
  const tambahanDitandai = tambahan.map(function (m, i) {
    return Object.assign({}, m, { tipe: "tambahan", idx: i });
  });

  return dasarDitandai.concat(tambahanDitandai);
}

function hapusMenuTambahan(idx) {
  const simpanan = localStorage.getItem("brewit_menu_tambahan");
  const tambahan = simpanan ? JSON.parse(simpanan) : [];
  tambahan.splice(idx, 1);
  localStorage.setItem("brewit_menu_tambahan", JSON.stringify(tambahan));
}

function simpanMenuBaru(menuBaru) {
  const simpanan = localStorage.getItem("brewit_menu_tambahan");
  const tambahan = simpanan ? JSON.parse(simpanan) : [];
  tambahan.push(menuBaru);
  localStorage.setItem("brewit_menu_tambahan", JSON.stringify(tambahan));
}

// Function proses data
function urutkanBerdasarkanCost(arr) {
  return [...arr].sort(function (a, b) { return a.cost - b.cost; });
}

function hitungTotalCost(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) total += arr[i].cost;
  return total;
}

function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toLocaleString("id-ID");
}

function renderMenu(arr) {
  const container = document.getElementById("menu-container");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const card = document.createElement("div");
    card.className = "menu-card";

    let listBahan = "";
    for (let j = 0; j < item.bahan.length; j++) {
      listBahan += "<li>" + item.bahan[j] + "</li>";
    }

    const tombolHapus = item.tipe === "tambahan"
      ? '<button type="button" class="btn-hapus-menu" data-idx="' + item.idx + '" style="float:right; color:red; border:none; background:none; cursor:pointer;">Hapus</button>'
      : "";

    card.innerHTML =
      tombolHapus +
      '<h3 class="menu-title" style="cursor:pointer;">' + item.nama + " ▾</h3>" +
      '<ul class="daftar-bahan" style="display:none;">' + listBahan + "</ul>" +
      '<span class="badge">Cost: ' + formatRupiah(item.cost) + "/gelas</span>";

    container.appendChild(card);
  }

  const totalEl = document.getElementById("total-cost");
  if (totalEl) {
    totalEl.textContent = "Total cost semua menu: " + formatRupiah(hitungTotalCost(arr));
  }
}

//  jQuery
$(document).ready(function () {

  renderMenu(urutkanBerdasarkanCost(ambilSemuaMenu()));

  $("#menu-container").on("click", ".menu-title", function () {
    $(this).next(".daftar-bahan").slideToggle();
  });

  $("#menu-container").on("click", ".btn-hapus-menu", function (e) {
    e.stopPropagation(); // biar gak ikut toggle slideToggle
    const idx = $(this).data("idx");
    if (confirm("Hapus menu ini?")) {
        hapusMenuTambahan(idx);
        renderMenu(urutkanBerdasarkanCost(ambilSemuaMenu()));
    }
  });

  function buatOptionBahan() {
    let opsi = "";
    for (const key in namaTampil) {
      opsi += '<option value="' + key + '">' + namaTampil[key] + "</option>";
    }
    return opsi;
  }

  function tambahBarisBahan() {
    const baris = $(
      '<div class="baris-bahan" style="display:flex; gap:8px; align-items:flex-end; margin-bottom:10px;">' +
        '<div style="flex:2;"><label>Bahan</label>' +
          '<select class="input-bahan">' + buatOptionBahan() + "</select></div>" +
        '<div style="flex:1;"><label>Qty</label>' +
          '<input type="number" class="input-qty" placeholder="60"></div>' +
        '<div style="flex:1;"><label>Satuan</label>' +
          '<span class="label-satuan">ml</span></div>' +
        '<button type="button" class="btn-hapus-baris">&times;</button>' +
      "</div>"
    );
    $("#daftar-baris-bahan").append(baris);
  }

  if ($("#daftar-baris-bahan").length) {
    tambahBarisBahan();
  }

  // tombol + Tambah Bahan
  $("#btn-tambah-bahan").on("click", function () {
    tambahBarisBahan();
  });

  // hapus baris
  $("#daftar-baris-bahan").on("click", ".btn-hapus-baris", function () {
    $(this).closest(".baris-bahan").remove();
  });

  // update label satuan otomatis sesuai bahan yang dipilih
  $("#daftar-baris-bahan").on("change", ".input-bahan", function () {
    const bahan = $(this).val();
    $(this).closest(".baris-bahan").find(".label-satuan").text(hargaBahan[bahan].satuan);
  });

  $("#form-tambah-menu").on("submit", function (e) {
    e.preventDefault();

    const nama = $("#nama-menu").val().trim();
    const pesan = $("#form-pesan");
    const barisBahan = $(".baris-bahan");

    if (nama === "" || barisBahan.length === 0) {
      pesan.text("Nama menu dan minimal 1 bahan wajib diisi.").css("color", "red").show();
      return;
    }

    let totalCost = 0;
    let daftarBahanBaru = [];
    let adaQtyKosong = false;

    barisBahan.each(function () {
      const bahanKey = $(this).find(".input-bahan").val();
      const qty = parseFloat($(this).find(".input-qty").val());

      if (isNaN(qty) || qty <= 0) {
        adaQtyKosong = true;
        return;
      }

      const info = hargaBahan[bahanKey];
      totalCost += qty * info.harga;
      daftarBahanBaru.push(qty + info.satuan + " " + namaTampil[bahanKey]);
    });

    if (adaQtyKosong) {
      pesan.text("Pastikan qty tiap bahan terisi dengan angka valid.").css("color", "red").show();
      return;
    }

    const menuBaru = { nama: nama, bahan: daftarBahanBaru, cost: Math.round(totalCost) };
    simpanMenuBaru(menuBaru);

    pesan
      .text('Menu "' + nama + '" berhasil ditambahkan! Cost: ' + formatRupiah(totalCost) + "/gelas. Cek halaman Menu.")
      .css("color", "green")
      .show();

    this.reset();
    $("#daftar-baris-bahan").empty();
    tambahBarisBahan();
  });
});